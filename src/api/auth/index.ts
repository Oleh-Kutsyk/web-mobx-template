import type {
  IGetAuthRefreshTokenBE,
  IGetAuthRefreshTokenParams,
  IGetAuthTokenBE,
  IGetAuthTokenParams,
  IGlobalSignOutBEParams,
} from './models/token';
import { TAsyncActionOptions } from 'src/store/utils/asyncModel';
import { requestService } from 'src/core/services';
import { authRoutes } from './routes';

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
      null,
      {
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
}
