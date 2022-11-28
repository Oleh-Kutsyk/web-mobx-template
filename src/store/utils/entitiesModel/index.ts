import { IAnyModelType, IOptionalIType, types, cast } from 'mobx-state-tree';
import { normalize, Schema } from 'normalizr';
import { TMergeStrategyType } from '../collectionModel';

// #OptionalMapping - keep for example of auto mapping
// type TCollections = {
//   [k: string]: IAnyModelType;
// };

type TCollections = {
  [k: string]: IOptionalIType<IAnyModelType, [undefined]>;
};

export function createEntitiesModel<
  T extends TCollections
  // #OptionalMapping
  // TKeys extends Extract<keyof T, string>
>(collections: T): IOptionalIType<typeof entityModal, [undefined]> {
  // #OptionalMapping
  // type TOptionalCollections = {
  //   [K in TKeys]: IOptionalIType<T[K], T[K]['SnapshotType']>;
  // };
  // const optionalModels = getOptionalModels<TOptionalCollections>(collections);

  const entityModal = types.model(collections).actions(self => ({
    merge(
      normalizedEntities: { [key: string]: Record<string | number, unknown> },
      mergeStrategy: TMergeStrategyType,
      shouldClearBeforeMerge: boolean
    ) {
      const updateStrategy: TMergeStrategyType = mergeStrategy || 'assign';

      Object.entries(normalizedEntities).forEach(([key, normalizedEntity]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const storeEntity = self[key] as any;

        if (!storeEntity) {
          return;
        }

        shouldClearBeforeMerge && storeEntity.collection.clear();

        Object.entries(normalizedEntity).forEach(([nestedKey, value]) => {
          if (storeEntity.has(nestedKey)) {
            storeEntity.update(nestedKey, value, updateStrategy);
          } else {
            storeEntity.collection.set(String(nestedKey), value);
          }
        });
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalizeMerge(data: any, schema: Schema) {
      const { result, entities } = normalize(data, schema);

      self.merge(entities, 'assign', true);

      return result;
    },
  }));

  return types.optional<typeof entityModal>(entityModal, cast({})); // cast fix TS, or use as any
}
