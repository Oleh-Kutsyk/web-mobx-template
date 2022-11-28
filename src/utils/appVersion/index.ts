import { TRootStoreInstance } from 'src/store/configureStore/configureStore';
import { localStorageService } from 'src/core/services';
import { LOCAL_STORAGE_KEYS } from 'src/constants';

export const checkAppVersion = (store: TRootStoreInstance): void => {
  const appVersionOld = localStorageService.get(LOCAL_STORAGE_KEYS.appVersion);
  const appVersionNew = process.env.REACT_APP_VERSION;

  if (!appVersionOld || Number(appVersionOld) < Number(appVersionNew)) {
    store.auth.logoutAsync.run();
    return;
  }
};
