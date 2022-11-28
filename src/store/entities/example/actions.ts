import { createThunk } from '../../utils/asyncModel';
import {
  IDeleteSubCategoryParams,
  IPostCategoryParams,
  IPutSubCategoryParams,
  IUpdateCategoryParams,
  IUpdateSubCategoryParams,
  TGetCategoryParams,
} from '../../../api/category/models/category';
import { api } from '../../../api';
import { categoriesSchema } from './schemas';
import { returnTypedThis } from '../../utils/common';
import { TInstrumentCategoryStore } from './category';
import { IIconBE, IIconDeleteParams, IIconParams } from '../../../types';

export const getCategoriesAsync = createThunk<TGetCategoryParams, void>(
  body =>
    async function getCategories(
      this: unknown,
      options,
      _flow,
      root
    ): Promise<void> {
      const res = await api.Category.getCategories(body, options);
      root.entities.normalizeMerge(res, categoriesSchema);
    }
);

export const createCategoryAsync = createThunk<IPostCategoryParams, void>(
  body =>
    async function postCategory(this: unknown, options, _flow): Promise<void> {
      await api.Category.postCategory(body, options);
    }
);

export const updateCategoryAsync = createThunk<IUpdateCategoryParams, void>(
  body =>
    async function updateCategory(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      await api.Category.updateCategory(body, options);
    }
);

export const uploadFileAsync = createThunk<File, IIconBE>(
  body =>
    async function uploadImage(this: unknown, _options, _flow) {
      const result = await api.File.uploadFile(body, [
        { key: 'AdminImageType', value: 'CategoryIcon' },
      ]);
      return {
        url: result.fileUrl,
        id: result.id,
      };
    }
);

export const updateCategoryIconAsync = createThunk<IIconParams, void>(
  body =>
    async function updateCategory(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      const that = returnTypedThis<TInstrumentCategoryStore>(this);

      const result = body.file
        ? await that.uploadFileAsync.run(body.file)
        : { id: 0, url: '' };

      if (result) {
        await api.Category.updateCategoryIcon(
          { id: body.id, url: result.url },
          options
        );
        that.runInAction(() => {
          that.iconUrl = result.url;
        });
      }
    }
);

export const deleteCategoryIconAsync = createThunk<IIconDeleteParams, void>(
  body =>
    async function updateCategory(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      const that = returnTypedThis<TInstrumentCategoryStore>(this);

      await api.Category.deleteCategoryIcon(body, options);

      that.runInAction(() => {
        that.iconUrl = '';
      });
    }
);

export const deleteCategoryAsync = createThunk<IIconDeleteParams, void>(
  params =>
    async function deleteCategory(
      this: unknown,
      options,
      _flow,
      root
    ): Promise<void> {
      await api.Category.deleteCategory(params, options);
      root.entities.categories.delete(params.id);
    }
);

export const createSubcategoryAsync = createThunk<IPutSubCategoryParams, void>(
  body =>
    async function getInstruments(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      await api.Category.postSubcategory(body, options);
    }
);

export const updateSubcategoryAsync = createThunk<
  IUpdateSubCategoryParams,
  void
>(
  body =>
    async function updateSubCategory(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      await api.Category.updateSubcategory(body, options);
    }
);

export const deleteSubcategoryAsync = createThunk<
  IDeleteSubCategoryParams,
  void
>(
  params =>
    async function deleteSubCategory(
      this: unknown,
      options,
      _flow
    ): Promise<void> {
      await api.Category.deleteSubcategory(params, options);
    }
);
