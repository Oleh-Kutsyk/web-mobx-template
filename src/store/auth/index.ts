import { types, SnapshotIn, SnapshotOut, Instance } from 'mobx-state-tree';
import { runInAction } from '../utils/common';
import {
  loginAsync,
  logoutAsync,
  authGetTokensAsync,
  authRefreshTokenAsync,
  checkAuthAsync,
} from './actions';
import { IGetAuthTokenBE } from '../../api/auth/models/token';

const initialTokens = {
  accessToken: '',
  expiresIn: 0,
  idToken: '',
  refreshToken: '',
  tokenType: '',
};

const tokens = types
  .model({
    accessToken: types.string,
    expiresIn: types.number,
    idToken: types.string,
    refreshToken: types.string,
    tokenType: types.string,
  })
  .actions(self => ({
    runInAction,
    setTokens(data: Partial<IGetAuthTokenBE>) {
      Object.keys(data).forEach(key => {
        self[key] = data[key];
      });
    },
    reset() {
      this.setTokens(initialTokens);
    },
  }));

const Auth = types
  .model('Auth', {
    isAuth: types.boolean,
    isAuthChecked: types.boolean,
    tokens: types.optional(tokens, initialTokens),
    loginAsync,
    logoutAsync,
    authGetTokensAsync,
    authRefreshTokenAsync,
    checkAuthAsync,
  })
  .actions(_self => ({
    runInAction,
  }));

export const auth = types.optional(Auth, {
  isAuth: false,
  isAuthChecked: false,
});

export type TAuthStore = Instance<typeof Auth>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuthStoreIn extends SnapshotIn<typeof Auth> {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuthStoreOut extends SnapshotOut<typeof Auth> {}
