import { devLoggerService } from 'src/core/services/devLogger';
import {
  httpClient,
  isHttpClientCancel,
  THttpClientRequestConfig,
} from 'src/core/services/api/httpClient';
import { refreshTokenWithReSendLastRequest } from 'src/core/services/api/refreshToken';
import { IGetAuthRefreshTokenBE } from 'src/api/auth/models/token';

import { browserHistoryInstance } from 'src/core/history';
import { ROUTES } from 'src/core/routes/routesPath';

const STATUS_CODE = {
  401: 401,
  403: 403,
  422: 422,
  500: 500,
};

const REQUEST_TIMEOUT = 8000; // 8s;

interface IConfig {
  getAccessToken: () => string | undefined;
  refreshToken: () => Promise<IGetAuthRefreshTokenBE | undefined>;
  getTokenType: () => string | undefined;
  logout: () => void;
}

export class HttpClientConfig {
  private _getAccessToken: IConfig['getAccessToken'];
  private _refreshToken: IConfig['refreshToken'];
  private _logout: IConfig['logout'];
  private _getTokenType: IConfig['getTokenType'];

  initialize(config: IConfig): void {
    this._setDefaults();
    this._refreshToken = config.refreshToken;
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
  private _setDefaults() {
    httpClient.defaults = {
      timeout: REQUEST_TIMEOUT,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private _setRequestInterceptors() {
    httpClient.interceptors.request.use(
      (config: THttpClientRequestConfig): THttpClientRequestConfig => {
        if (this._authHeader) {
          config.headers = {
            Authorization: this._authHeader,
          };
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

        if (response.status >= STATUS_CODE[500]) {
          console.log('STATUS_CODE[500]', STATUS_CODE[500]);
        }

        throw error;
      }
    );
  }

  private _processForbidden = (_msg = '') => {
    browserHistoryInstance.push(ROUTES.common.accessDenied);
  };
}

export const httpClientConfig = new HttpClientConfig();
