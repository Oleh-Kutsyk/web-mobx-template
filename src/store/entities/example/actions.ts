/* eslint-disable @typescript-eslint/no-unused-vars */
import { createThunk } from '../../utils/asyncModel';
// import { api } from 'src/api';

export const getCategoriesAsync = createThunk<void, void>(
  () =>
    async function getCategories(): Promise<void> {
      // this: unknown,
      // options,
      // _flow,
      // root
      // const that = returnTypedThis<TInstrumentCategoryStore>(this);
      // const res = await api.Category.getCategories(body, options);
      // root.entities.normalizeMerge(res, categoriesSchema);
    }
);
//
// interface IPostCategoryParams {
//   name: string;
// }
//
// export const createCategoryAsync = createThunk<IPostCategoryParams, void>(
//   body =>
//     async function postCategory(this: unknown, _options, _flow): Promise<void> {
//       // await api.Category.postCategory(body, options);
//     }
// );
//
// interface IPostCategoryRes {
//   name: string;
//   id: string;
// }
//
// export const updateCategoryAsync = createThunk<
//   IPostCategoryParams,
//   IPostCategoryRes
// >(
//   body =>
//     async function updateCategory(
//       this: unknown,
//       options,
//       _flow
//     ): Promise<IPostCategoryRes> {
//       // const res = await api.Category.updateCategory(body, options);
//       return {
//         name: 'name',
//         id: 'id',
//       };
//     }
// );
