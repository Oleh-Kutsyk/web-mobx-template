import { types } from 'mobx-state-tree';

export const MODALS = {
  createPushNotification: 'create-push-notification',
  notificationCenter: 'notification-center',
  manageCategories: 'manage-categories',
} as const;

const modalModel = types
  .model('modal', {
    id: types.optional(types.string, ''),
    isOpen: false,
  })
  .actions(store => ({
    open(id: keyof typeof MODALS) {
      store.isOpen = true;
      store.id = id;
    },
    close() {
      store.isOpen = false;
    },
  }));

export const modal = types.optional(modalModel, {});
