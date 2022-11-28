import { localStorageService } from '../../../core/services/localStorage';
import { applySnapshot, onSnapshot } from 'mobx-state-tree';
import { TRootStoreInstance } from '../../configureStore/configureStore';
import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorageKeys';

type TCreatePersist = (
  store: TRootStoreInstance,
  key: string
) => {
  rehydrate: () => void;
  clearPersist: () => void;
};

export const createPersist: TCreatePersist = (store, key) => {
  const rehydrate = () => {
    const snapshot = localStorageService.get(LOCAL_STORAGE_KEYS.persist);
    if (snapshot && JSON.parse(snapshot)[key]) {
      applySnapshot(store, JSON.parse(snapshot)[key]);
    }
  };

  const clearPersist = () => {
    localStorageService.remove(LOCAL_STORAGE_KEYS.persist);
    applySnapshot(store, {
      app: {},
      auth: { isAuthChecked: true, isAuth: false },
      entities: {},
      pages: {},
      ui: {},
      notifications: {},
    });
  };

  onSnapshot(store, (snapshot: TRootStoreInstance) => {
    const idToken = localStorageService.get(LOCAL_STORAGE_KEYS.tokens.idToken);

    if (idToken) {
      const localStorageSnapshot = localStorageService.get(
        LOCAL_STORAGE_KEYS.persist
      );

      let persistStore = {};

      if (localStorageSnapshot) {
        const storeValue = JSON.parse(localStorageSnapshot);
        persistStore = { ...storeValue, [key]: snapshot };
      } else {
        persistStore = { [key]: snapshot };
      }

      localStorageService.set(
        LOCAL_STORAGE_KEYS.persist,
        JSON.stringify(persistStore)
      );
    } else {
      clearPersist();
    }
  });

  rehydrate();

  return {
    rehydrate,
    clearPersist,
  };
};
