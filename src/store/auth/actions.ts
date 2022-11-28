import { createThunk } from 'src/store/utils/asyncModel';
import {
  IGetAuthRefreshTokenBE,
  IGetAuthTokenBE,
  IGetAuthTokenParams,
} from 'src/api/auth/models/token';
import { returnTypedThis } from 'src/store/utils/common';
import { TAuthStore } from 'src/store/auth/index';
import { api } from 'src/api';
import { localStorageService } from 'src/core/services';
import { LOCAL_STORAGE_KEYS } from 'src/constants';

export const authGetTokensAsync = createThunk<
  IGetAuthTokenParams,
  IGetAuthTokenBE
>(data => {
  return async function authGetTokens(this: unknown, options, _flow) {
    const that = returnTypedThis<TAuthStore>(this);
    const resp = await api.Auth.getToken(data, options);
    that.tokens.setTokens(resp);
    localStorageService.set(
      LOCAL_STORAGE_KEYS.appVersion,
      process.env.REACT_APP_VERSION as string
    );
    localStorageService.set(LOCAL_STORAGE_KEYS.tokens.access, resp.accessToken);
    localStorageService.set(
      LOCAL_STORAGE_KEYS.tokens.refresh,
      resp.refreshToken
    );
    localStorageService.set(LOCAL_STORAGE_KEYS.tokens.idToken, resp.idToken);
    localStorageService.set(
      LOCAL_STORAGE_KEYS.tokens.expiresIn,
      resp.expiresIn.toString()
    );
    localStorageService.set(
      LOCAL_STORAGE_KEYS.tokens.tokenType,
      resp.tokenType
    );
    return resp;
  };
});

// #Workaround for fix TS ISSUE - type TAuthStore = any, Type alias 'TAuthStore' circularly references itself.ts(2456)
// https://www.bookstack.cn/read/typescriptlang-3.7/spilt.6.055dccf6c3f8aae3.md
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRefreshToken = (store: any): string =>
  store.tokens.refreshToken as unknown as string;

export const authRefreshTokenAsync = createThunk<void, IGetAuthRefreshTokenBE>(
  () => {
    return async function authRefreshToken(this: unknown, options, _flow) {
      const that = returnTypedThis<TAuthStore>(this);
      const refreshToken = getRefreshToken(that);
      const resp = await api.Auth.refreshToken({ refreshToken }, options);
      that.tokens.setTokens(resp);
      localStorageService.set(
        LOCAL_STORAGE_KEYS.tokens.access,
        resp.accessToken
      );
      localStorageService.set(LOCAL_STORAGE_KEYS.tokens.idToken, resp.idToken);
      localStorageService.set(
        LOCAL_STORAGE_KEYS.tokens.expiresIn,
        resp.expiresIn.toString()
      );
      localStorageService.set(
        LOCAL_STORAGE_KEYS.tokens.tokenType,
        resp.tokenType
      );
      return resp;
    };
  }
);

interface ILoginAsync {
  password: string;
  username: string;
}

export const loginAsync = createThunk<ILoginAsync, void>(body => {
  return async function login(this: unknown, _options, _flow) {
    const that = returnTypedThis<TAuthStore>(this);
    await that.authGetTokensAsync.run(body);
    that.runInAction(() => {
      that.isAuth = true;
    });
  };
});

export const logoutAsync = createThunk<void, void>(() => {
  return async function logout(this: unknown, options, _flow) {
    const that = returnTypedThis<TAuthStore>(this);

    const accessToken = that.tokens.accessToken;
    await api.Auth.globalSignOut({ accessToken }, options);

    localStorageService.remove(LOCAL_STORAGE_KEYS.tokens.access);
    localStorageService.remove(LOCAL_STORAGE_KEYS.tokens.refresh);
    localStorageService.remove(LOCAL_STORAGE_KEYS.tokens.idToken);
    localStorageService.remove(LOCAL_STORAGE_KEYS.tokens.expiresIn);
    localStorageService.remove(LOCAL_STORAGE_KEYS.tokens.tokenType);

    that.tokens.reset();
    that.runInAction(() => {
      that.isAuth = false;
    });
  };
});

export const checkAuthAsync = createThunk<void, void>(() => {
  return function checkAuth(this: unknown, options, _flow) {
    const that = returnTypedThis<TAuthStore>(this);
    return api.Auth.checkAuth(null, options)
      .then(() => {
        that.runInAction(() => {
          that.isAuth = true;
        });
      })
      .finally(() => {
        that.runInAction(() => {
          that.isAuthChecked = true;
        });
      });
  };
});
