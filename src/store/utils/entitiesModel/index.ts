/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAnyModelType, IOptionalIType, types, cast } from 'mobx-state-tree';
import { normalize, Schema } from 'normalizr';

import { TMergeStrategyType } from 'src/store/utils/collectionModel';

type TCollections = {
  [k: string]: IOptionalIType<IAnyModelType, [undefined]>;
};

export function createEntitiesModel<T extends TCollections>(
  collections: T
): IOptionalIType<typeof entityModal, [undefined]> {
  const entityModal = types.model(collections).actions(self => ({
    merge(
      normalizedEntities: { [key: string]: Record<string | number, unknown> },
      mergeStrategy: TMergeStrategyType,
      shouldClearBeforeMerge: boolean
    ) {
      const updateStrategy: TMergeStrategyType = mergeStrategy || 'assign';

      Object.entries(normalizedEntities).forEach(([key, normalizedEntity]) => {
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
