import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic,
  CancelToken,
} from 'axios';

export type THttpClientInstance = AxiosInstance;
export type THttpClientResponse<T> = AxiosResponse<T>;

// TODO: check with BE default structure of response
// export type THttpClientResponse<T> = AxiosResponse<{
// 	message: string;
// 	result: T;
// }>;

export type THttpClientRequestConfig = AxiosRequestConfig;

// THttpResponse is util type for reduce manually wright Promise<T>
export type THttpResponse<T> = Promise<THttpClientResponse<T>>;

export type TBEResponse<T> = { result: T; message: string };

export const httpClient: THttpClientInstance = Axios.create();

export const isHttpClientCancel = Axios.isCancel;
export const isHttpClientError = Axios.isAxiosError;

export const httpClientCancelTokenStatic = Axios.CancelToken;
export type THttpClientCancelTokenStatic = CancelTokenStatic;
export type THttpClientCancelToken = CancelToken;
