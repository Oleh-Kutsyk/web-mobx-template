/* eslint-disable @typescript-eslint/no-explicit-any */
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
  isHttpClientCancel,
  THttpClientCancelToken,
} from 'src/core/services/api/httpClient';
import { TRootStoreInstance } from 'src/store/configureStore/configureStore';

const asyncModel = t
  .model('async', {
    inProgress: false,
    inProgressRetry: false,
    error: t.optional(t.frozen(), null),
    hasEverBeenRun: false,
    throwable: false,
  })
  .views(store => ({
    get isError() {
      return Boolean(store.error);
    },

    get canBeRun() {
      return !store.error && !store.inProgress;
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

    success() {
      if (!store.hasEverBeenRun) {
        store.hasEverBeenRun = true;
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }
    },

    failed(err: Error, throwError = store.throwable) {
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
    let cancelTokenSource: any;
    return {
      beforeDestroy() {
        cancelTokenSource &&
          cancelTokenSource.cancel('Canceled from thunkModel on beforeDestroy');
      },

      async auto<TR2>(promise: any): Promise<TR2 | undefined> {
        try {
          store.start();

          const value = await promise();

          store.success();

          return value;
        } catch (err) {
          if (!isHttpClientCancel(err)) {
            store.failed(err as Error, throwError);
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
