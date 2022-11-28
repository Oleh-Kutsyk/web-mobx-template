/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  types,
  IAnyModelType,
  getIdentifier,
  IOptionalIType, // IMapType,
  Instance,
  SnapshotIn,
  IMSTMap,
} from 'mobx-state-tree';

type TId = string | number;

type TMergeFunction = (
  item: IAnyModelType,
  value: SnapshotIn<IAnyModelType>
) => void;

export type TMergeStrategyType = 'assign' | 'replace' | TMergeFunction;

export const createCollectionModel = <
  T extends IAnyModelType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TModelValues extends Record<string, any>,
  TActionKeys extends string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TActionValues extends any | undefined // IOptionalIType<IAnyModelType, [undefined]>
>(
  modelForCollection: T,
  asyncModels?: Record<TActionKeys, TActionValues>,
  defaultValueOrFunction?: Partial<T> | (() => Partial<T>)
): IOptionalIType<typeof collectionModel, [undefined]> => {
  type TCurrentCollection = IMSTMap<T>;
  const collectionModel = types
    .model('collection', {
      collection: types.map(modelForCollection),
      ...asyncModels,
    })
    .views(self => ({
      get(id: TId): ReturnType<TCurrentCollection['get']> {
        return self.collection.get(String(id));
      },
      getAll(): Array<TModelValues> {
        return Array.from(self.collection.values());
      },
      has(id: TId): ReturnType<TCurrentCollection['has']> {
        return self.collection.has(String(id));
      },
    }))
    .actions(self => ({
      add(id: TId, value: Instance<T>) {
        self.collection.set(String(id), value);
      },
      delete(id: TId) {
        self.collection.delete(String(id));
      },
      destroy(item: T) {
        const id = getIdentifier(item);

        if (id === null) {
          throw new Error(
            "CollectionModel: Couldn't destroy the item. Identifier is not resolved"
          );
        }

        self.collection.delete(String(item));
      },
      update(
        id: TId,
        value: Partial<SnapshotIn<T>>, // SnapshotIn<T>,
        mergeStrategy?: TMergeStrategyType
      ) {
        const item = self.collection.get(String(id));
        if (mergeStrategy === 'replace') {
          self.collection.set(String(id), value);
        } else if (
          typeof mergeStrategy === 'function' &&
          typeof item !== 'undefined'
        ) {
          mergeStrategy(item, value);
        } else {
          Object.assign(item as any, value);
        }
      },
      find(callback: (item: T) => T | undefined) {
        return Array.from(self.collection.values()).find(callback); // also can use { values } from 'mobx'
      },
    }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return types.optional<typeof collectionModel>(
    collectionModel,
    (defaultValueOrFunction as any) || {}
  );
};
