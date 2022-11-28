import {
  types as t,
  getParent,
  Instance,
  IOptionalIType,
  getRoot,
} from 'mobx-state-tree';
import { normalize, Schema } from 'normalizr';
import {
  httpClientCancelTokenStatic,
  THttpClientCancelToken,
  isHttpClientCancel,
} from '../../../core/services/api/httpClient';
import type { TRootStoreInstance } from '../../configureStore/configureStore';
import { responseHandling, STATUS_CODE } from '../../../utils/responseHandling';
import { INotificationIn } from '../../notifications';

const asyncModel = t
  .model('async', {
    inProgress: false,
    inProgressRetry: false,
    error: t.optional(t.frozen(), null),
    hasEverBeenRun: false,
    throwable: false,
  })
  .views(store => ({
    get errorMessage() {
      if (store.error && store.error.message) {
        return store.error && store.error.message;
      }

      return null;
    },

    get isError() {
      return Boolean(store.error);
    },

    get canBeRun() {
      return !store.error && !store.inProgress;
    },

    get inProgressAgain() {
      return store.inProgress && store.hasEverBeenRun;
    },
  }))
  .actions(store => ({
    start(retry = false) {
      if (retry) {
        store.inProgressRetry = true;
      } else {
        store.inProgress = true;
      }

      store.error = null;
    },

    success(funcName: string) {
      const root = getRoot<TRootStoreInstance>(store);
      const addNotification = (notification: INotificationIn) =>
        root.notifications.add(notification);

      if (!store.hasEverBeenRun) {
        store.hasEverBeenRun = true;
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }
      responseHandling(addNotification, 'success', funcName, STATUS_CODE[200]);
    },

    failed(err: Error, funcName, throwError = store.throwable) {
      const root = getRoot<TRootStoreInstance>(store);
      const addNotification = (notification: INotificationIn) =>
        root.notifications.add(notification);

      if (!store.hasEverBeenRun) {
        store.hasEverBeenRun = true;
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }

      // TODO: add Error type after BE implement errors
      // @ts-expect-error - use base error without BE Model
      const response = err?.response;

      const errors = response?.data?.errors;
      const errorMessage = errors?.length
        ? response?.data?.errors[0].message
        : '';

      responseHandling(
        addNotification,
        'error',
        funcName,
        response?.status,
        response ? errorMessage || (response?.data?.message ?? err.message) : ''
      );
      if (response) {
        store.error = {
          message: response?.data?.message ?? err.message,
          status: response?.status ?? null,
          statusText: response?.statusText ?? null,
          reason: response?.data?.reason ?? null,
          errorCode: response?.data?.error ?? response?.code,
          meta: response?.data?.meta ?? null,
        };
      } else {
        store.error = err;
      }

      if (throwError) {
        throw err;
      }
    },

    throwError(value: boolean) {
      store.throwable = value;
    },
  }));

export type TAsyncActionOptions = {
  cancelToken: {
    cancelToken?: THttpClientCancelToken;
  };
};

type TAsyncAction<TR> = (
  options: TAsyncActionOptions,
  flow: Instance<typeof asyncModel>,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  root: TRootStoreInstance
) => TR | undefined;

type TShouldSkipCheck = (flow: Instance<typeof asyncModel>) => boolean;

export type TThunk<TA, TR> = (
  args: TA
) => TAsyncAction<TR> | [TShouldSkipCheck, TAsyncAction<TR>];

export type TMapStateCallback<TA, TS, TR> = (
  args: TA,
  store: TS
) => TR | undefined;

type TCreateThunkInternal = ReturnType<typeof createThunk>;
export type TInstanceCreateThunk = Instance<TCreateThunkInternal>;

export function createThunk<TA, TR, TRInPromise = Promise<TR>>(
  thunk: TThunk<TA, TRInPromise>,
  auto = true,
  throwError = auto
): IOptionalIType<typeof thunkModel, [undefined]> {
  // type TThunkRType = ReturnType<typeof thunk> extends Array<
  //   TShouldSkipCheck | TAsyncAction<TR>
  // >
  //   ? TRInPromise | undefined
  //   : TRInPromise;

  const thunkModel = asyncModel.named('thunkModel').actions(store => {
    let cancelTokenSource;
    return {
      beforeDestroy() {
        cancelTokenSource &&
          cancelTokenSource.cancel('Canceled from thunkModel on beforeDestroy');
      },

      async auto<TR2>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        promise: any,
        funcName: string
      ): Promise<TR2 | undefined> {
        try {
          store.start();

          const value = await promise();

          store.success(funcName);

          return value;
        } catch (err) {
          if (!isHttpClientCancel(err)) {
            store.failed(err, funcName, throwError);
          }
        }

        // eslint-disable-next-line no-undefined
        return undefined;
      },

      run: function run(args: TA): TRInPromise | undefined {
        // TThunkRType
        // eslint-disable-next-line @typescript-eslint/ban-types
        const fn = thunk(args) as Function;
        const funcName: string = fn.name;

        if (cancelTokenSource) {
          cancelTokenSource.cancel('CANCEL_REQUEST');
        }

        cancelTokenSource = httpClientCancelTokenStatic.source();

        let promise: () => TRInPromise | undefined;

        if (Array.isArray(fn)) {
          const [check, actualThunk] = fn;

          const shouldSkip = check.bind(getParent(store))(store);

          if (shouldSkip) {
            // need to possibility wright .?then() and don't check result in then()
            // eslint-disable-next-line no-undefined
            return undefined;
          }

          promise = () =>
            actualThunk.bind(getParent(store))(
              {
                cancelToken: {
                  cancelToken: cancelTokenSource.token,
                },
              },
              store,
              getRoot(store)
            );
        } else {
          promise = () =>
            fn.bind(getParent(store))(
              {
                cancelToken: { cancelToken: cancelTokenSource.token },
              },
              store,
              getRoot(store)
            );
        }

        if (auto) {
          // @ts-expect-error fix ts issue - 'TRInPromise' could be instantiated with an arbitrary type
          // which could be unrelated to 'Promise<TRInPromise | undefined>'.ts(2322)
          return this.auto<TRInPromise>(promise, funcName);
        }

        return promise();
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      merge: function merge(data: any, schema: Schema) {
        const { entities, result } = normalize(data, schema);
        // TODO: add TS types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getRoot<TRootStoreInstance>(store).entities.merge(entities as any);
        return result;
      },
    };
  });

  return t.optional<typeof thunkModel>(thunkModel, {});
}
