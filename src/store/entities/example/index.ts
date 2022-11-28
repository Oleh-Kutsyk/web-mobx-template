import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import {
  getCategoriesAsync,
  // createCategoryAsync,
  // updateCategoryAsync,
} from './actions';
import { runInAction } from 'src/store/utils/common';
import { createCollectionModel } from 'src/store/utils/collectionModel';

const Subcategory = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    isEditing: false,
  })
  .actions(store => ({
    runInAction,
    toggleEditing() {
      store.isEditing = !store.isEditing;
    },
  }));

export const Category = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    iconUrl: types.maybeNull(types.string),
    isEditing: false,
    isAddingSubcategory: false,
    subcategories: types.array(Subcategory),
    // updateCategoryAsync,
  })
  .views(store => ({
    getSortedSubcategories() {
      const sortedArr = [...store.subcategories].sort(
        (subcategoryA, subcategoryB) => subcategoryB.id - subcategoryA.id
      );
      return store.subcategories.length ? sortedArr : [];
    },
  }))
  .actions(store => ({
    runInAction,
    toggleEditing() {
      store.isEditing = !store.isEditing;
    },
    toggleAddingSubcategory() {
      store.isAddingSubcategory = !store.isAddingSubcategory;
    },
  }));

export const categories = createCollectionModel(Category, {
  getCategoriesAsync,
  // createCategoryAsync,
});

export type TInstrumentCategoryStore = Instance<typeof Category>;
export type TInstrumentSubcategoryStore = Instance<typeof Subcategory>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInstrumentCategoriesStoreIn
  extends SnapshotIn<typeof Category> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInstrumentCategoriesStoreOut
  extends SnapshotOut<typeof Category> {}
