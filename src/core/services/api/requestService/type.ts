import { THttpClientResponse, THttpClientRequestConfig } from '../httpClient';
export interface IRequestService {
  head<T = unknown>(
    url: string,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>; // Promise<AxiosResponse<T>>
  get<T = unknown>(
    url: string,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>;
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>;
  delete<T = unknown>(
    url: string,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>;
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>;
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<T>>;
}
