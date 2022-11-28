import { localStorageService } from '../../core/services/localStorage';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import type { TRootStoreInstance } from '../../stores/configureStore/configureStore';

const expiresInEmpty = 0;

interface IGetAuthTokensFromLocalStorageReturn {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export const getAuthTokensFromLocalStorage =
  (): IGetAuthTokensFromLocalStorageReturn => {
    const expiresInCookie = localStorageService.get(
      LOCAL_STORAGE_KEYS.tokens.expiresIn
    );
    const expiresIn = expiresInCookie
      ? Number(expiresInCookie)
      : expiresInEmpty;
    return {
      accessToken:
        localStorageService.get(LOCAL_STORAGE_KEYS.tokens.access) || '',
      idToken: localStorageService.get(LOCAL_STORAGE_KEYS.tokens.idToken) || '',
      refreshToken:
        localStorageService.get(LOCAL_STORAGE_KEYS.tokens.refresh) || '',
      tokenType:
        localStorageService.get(LOCAL_STORAGE_KEYS.tokens.tokenType) || '',
      expiresIn,
    };
  };

export const setupAuthTokensToStore = (store: TRootStoreInstance): void => {
  const tokens = getAuthTokensFromLocalStorage();
  store.auth.tokens.setTokens(tokens);
};
