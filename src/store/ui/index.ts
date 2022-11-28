import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { sidebar } from './sidebar';
import { modal } from './modals';

export const uiModel = types.model('ui', {
  sidebar,
  modal,
});

export const ui = types.optional(uiModel, {});

export type TUiStore = Instance<typeof uiModel>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUiStoreIn extends SnapshotIn<typeof uiModel> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUiStoreOut extends SnapshotOut<typeof uiModel> {}
