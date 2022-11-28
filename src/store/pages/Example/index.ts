import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  castToSnapshot,
} from 'mobx-state-tree';

import { Category } from '../../entities/categories/category';

export const categoriesModel = types
  .model('Categories', {
    selectedCategory: types.maybeNull(types.safeReference(Category)),
  })
  .actions(store => ({
    setSelectedCategory(categoryId: number | null) {
      if (!categoryId) {
        store.selectedCategory = null;
      } else {
        store.selectedCategory = castToSnapshot(categoryId);
      }
    },
  }));

export const categoriesStore = types.optional(categoriesModel, {});

export type TCategoriesStore = Instance<typeof categoriesModel>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICategoriesStoreIn
  extends SnapshotIn<typeof categoriesModel> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICategoriesStoreOut
  extends SnapshotOut<typeof categoriesModel> {}
