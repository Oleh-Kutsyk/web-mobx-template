import qs from 'qs'; // TODO: change to query-string
import {
  httpClient,
  THttpClientRequestConfig,
  isHttpClientCancel,
} from './httpClient';
import { devLoggerService } from '../devLogger';
import { browserHistoryInstance } from '../../history';
import { ROUTES } from '../../routes/routesPath';
import { refreshTokenWithReSendLastRequest } from './refreshToken';
import type { IGetAuthRefreshTokenBE } from '../../../api/auth/models/token';

const STATUS_CODE = {
  401: 401,
  403: 403,
  422: 422,
  500: 500,
};

const REQUEST_TIMEOUT = 8000; // 8s;

interface IConfig {
  defaults: Partial<THttpClientRequestConfig>;
  getAccessToken: () => string | undefined;
  getBrand: () => string | undefined;
  getProduct: () => string | undefined;
  refreshToken: () => Promise<IGetAuthRefreshTokenBE | undefined>;
  getTokenType: () => string | undefined;
  logout: () => void;
}

export class HttpClientConfig {
  private _getAccessToken: IConfig['getAccessToken'];
  private _refreshToken: IConfig['refreshToken'];
  private _getBrand: IConfig['getBrand'];
  private _getProduct: IConfig['getProduct'];
  private _logout: IConfig['logout'];
  private _getTokenType: IConfig['getTokenType'];

  initialize(config: IConfig): void {
    this._setDefaults(config.defaults);
    this._refreshToken = config.refreshToken;
    this._getBrand = config.getBrand;
    this._getProduct = config.getProduct;
    this._getAccessToken = config.getAccessToken;
    this._logout = config.logout;
    this._getTokenType = config.getTokenType;
    this._setRequestInterceptors();
    this._setResponseInterceptors();
  }

  private get _authHeader() {
    const token = this._getAccessToken();
    const tokenType = this._getTokenType();
    return token ? `${tokenType} ${token}` : '';
  }

  // eslint-disable-next-line class-methods-use-this
  private _setDefaults(defaults: Partial<THttpClientRequestConfig> = {}) {
    httpClient.defaults.timeout = REQUEST_TIMEOUT;
    httpClient.defaults.baseURL = defaults.baseURL;
    httpClient.defaults.headers = {
      ...defaults.headers,
      'Content-Type': 'application/json',
    };
    httpClient.defaults.paramsSerializer = params => {
      return qs.stringify(params, { arrayFormat: 'repeat', encode: false });
    };
    // Keep next line for check case with cache
    // httpClient.defaults.headers.common['cache-control'] = 'no-cache';
  }

  private _setRequestInterceptors() {
    httpClient.interceptors.request.use(
      (config: THttpClientRequestConfig): THttpClientRequestConfig => {
        if (this._getBrand()) {
          config.headers.Brand = this._getBrand();
        }
        if (this._getProduct()) {
          config.headers.Product = this._getProduct();
        }
        if (this._authHeader) {
          config.headers.Authorization = this._authHeader;
        }

        return config;
      },
      (error: Error): Error => {
        devLoggerService.error('Error in _setRequestInterceptors', { error });
        throw error;
      }
    );
  }

  private _setResponseInterceptors() {
    httpClient.interceptors.response.use(
      response => {
        return {
          ...response,
          data: response.data.data || response.data,
        };
      },
      // eslint-disable-next-line complexity
      error => {
        // eslint-disable-next-line no-undefined
        const response = error ? error.response : undefined;

        if (isHttpClientCancel(error)) {
          devLoggerService.log('Request canceled by Http Client', error);
          throw error;
        }

        if (!response) {
          // error.isAxiosError && error.message === 'Network Error'
          // showNotification(
          //   'Network Error',
          //    NotificationType.error,
          // );
          devLoggerService.error(
            'Error in _setResponseInterceptors (!response)',
            { error }
          );

          throw { ...error, message: error?.message, response: {} };
        }

        if (response.status === STATUS_CODE[403]) {
          this._processForbidden();
          return;
        }

        if (response.status === STATUS_CODE[401]) {
          // eslint-disable-next-line consistent-return
          return refreshTokenWithReSendLastRequest(
            response.config,
            this._refreshToken,
            this._logout
          );
        }

        // if (response.status === STATUS_CODE[422]) {
        //   if (
        //     response.data.errors &&
        //     response.data.errors[0] &&
        //     response.data.errors[0].message === 'token_not_found'
        //   ) {
        //     // this._logout();
        //     return;
        //   }
        // }

        if (response.status >= STATUS_CODE[500]) {
          console.log('STATUS_CODE[500]', STATUS_CODE[500]);
        }

        throw error;
      }
    );
  }

  private _processForbidden = (_msg = '', showMessage = true) => {
    browserHistoryInstance.push(ROUTES.common.accessDenied);
    if (showMessage) {
      // showNotification(msg);
    }
  };
}

export const httpClientConfig = new HttpClientConfig();
