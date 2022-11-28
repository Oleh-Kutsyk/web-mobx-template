import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { categoriesStore } from './Example';

export const pages = types.model('pages', {
  categories: categoriesStore,
});

export type TPagesStore = Instance<typeof pages>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPagesStoreIn extends SnapshotIn<typeof pages> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPagesStoreOut extends SnapshotOut<typeof pages> {}
