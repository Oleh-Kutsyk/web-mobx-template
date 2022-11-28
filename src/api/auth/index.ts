/* eslint-disable @typescript-eslint/no-unused-vars */
import { requestService } from '../../core/services/api';
import { apiConfig } from '../../core/services/api/config';
import { authRoutes } from './routes';
import {
  IExampleModeBE,
  IExampleModeFE,
  getExampleModelToFE,
} from './models/userModelExample';
import { TAsyncActionOptions } from '../../stores/utils/asyncModel';
import type {
  IGetAuthRefreshTokenBE,
  IGetAuthRefreshTokenParams,
  IGetAuthTokenBE,
  IGetAuthTokenParams,
  IGlobalSignOutBEParams,
} from './models/token';

export class Auth {
  routes = authRoutes;

  async getToken(
    body: IGetAuthTokenParams,
    options: TAsyncActionOptions
  ): Promise<IGetAuthTokenBE> {
    const resp = await requestService.post<IGetAuthTokenBE>(
      this.routes.token,
      body,
      {
        baseURL: apiConfig.getApiUrls().auth,
        ...options.cancelToken,
      }
    );

    return resp?.data;
  }

  async refreshToken(
    body: IGetAuthRefreshTokenParams,
    options: TAsyncActionOptions
  ): Promise<IGetAuthRefreshTokenBE> {
    const resp = await requestService.post<IGetAuthRefreshTokenBE>(
      this.routes.refreshToken(body.refreshToken),
      {},
      {
        baseURL: apiConfig.getApiUrls().auth,
        ...options.cancelToken,
      }
    );

    return resp.data;
  }

  async globalSignOut(
    body: IGlobalSignOutBEParams,
    options: TAsyncActionOptions
  ): Promise<void> {
    const resp = await requestService.post<void>(
      this.routes.globalSignOut,
      body,
      {
        baseURL: apiConfig.getApiUrls().auth,
        ...options.cancelToken,
      }
    );

    return resp.data;
  }

  async checkAuth(_body: null, options: TAsyncActionOptions): Promise<void> {
    const resp = await requestService.get<void>('', {
      ...options.cancelToken,
    });

    return resp.data;
  }

  // For example of wright api call
  async getUser(
    userId: string,
    options: TAsyncActionOptions
  ): Promise<IExampleModeFE> {
    const data = await requestService.get<IExampleModeBE>(
      this.routes.user(userId),
      { ...options.cancelToken }
    );

    return getExampleModelToFE(data.data);
  }
}
