import { TRootStoreInstance } from '../../configureStore/configureStore';
import { createPersist } from './createPersist';

interface IStoreToPersist {
  store: TRootStoreInstance;
  key: string;
}

export const persist = (rootStore: TRootStoreInstance): void => {
  const storesPersist: Array<IStoreToPersist> = [
    { store: rootStore.pages.pushNotifications.activePush, key: 'activePush' },
    { store: rootStore.entities.categories, key: 'categories' },
    { store: rootStore.app, key: 'app' },
    { store: rootStore.ui, key: 'ui' },
  ];

  storesPersist.forEach(({ store, key }) => {
    if (store) {
      createPersist(store, key);
    }
  });
};
