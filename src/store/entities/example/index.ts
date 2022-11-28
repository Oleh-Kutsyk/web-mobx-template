import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import {
  deleteCategoryAsync,
  getCategoriesAsync,
  createCategoryAsync,
  updateCategoryAsync,
  createSubcategoryAsync,
  updateSubcategoryAsync,
  deleteSubcategoryAsync,
} from './actions';
import { runInAction } from 'src/store/utils/common';
import { createCollectionModel } from 'src/store/utils/collectionModel';

const Subcategory = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    isEditing: false,
    updateSubcategoryAsync,
  })
  .actions(store => ({
    runInAction,
    toggleEditing() {
      store.isEditing = !store.isEditing;
    },
  }));

export const Example = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    iconUrl: types.maybeNull(types.string),
    isEditing: false,
    isAddingSubcategory: false,
    subcategories: types.array(Subcategory),
    updateCategoryAsync,
    createSubcategoryAsync,
    deleteSubcategoryAsync,
    uploadFileAsync,
    updateCategoryIconAsync,
    deleteCategoryIconAsync,
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

export const categories = createCollectionModel(Example, {
  getCategoriesAsync,
  createCategoryAsync,
  deleteCategoryAsync,
});

export type TInstrumentCategoryStore = Instance<typeof Example>;
export type TInstrumentSubcategoryStore = Instance<typeof Subcategory>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInstrumentCategoriesStoreIn
  extends SnapshotIn<typeof Example> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInstrumentCategoriesStoreOut
  extends SnapshotOut<typeof Example> {}
