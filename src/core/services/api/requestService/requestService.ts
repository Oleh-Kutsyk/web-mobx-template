import {
  httpClient,
  THttpClientResponse,
  THttpClientRequestConfig,
} from '../httpClient';
import { IRequestService } from './type';

export type TRequestService = InstanceType<typeof RequestService>;

export class RequestService implements IRequestService {
  head<TSuccessPayload = unknown>(
    url: string,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.head<TSuccessPayload>(url, config);
  }

  get<TSuccessPayload = unknown>(
    url: string,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.get<TSuccessPayload>(url, {
      ...config,
      // This is workaround for setting "content-type":
      // https://github.com/axios/axios/issues/86,
      data: null,
    });
  }

  post<TSuccessPayload = unknown>(
    url: string,
    body?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.post<TSuccessPayload>(url, body, config);
  }

  put<TSuccessPayload = unknown>(
    url: string,
    body?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.put<TSuccessPayload>(url, body, config);
  }

  patch<TSuccessPayload = unknown>(
    url: string,
    body?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.patch<TSuccessPayload>(url, body, config);
  }

  delete<TSuccessPayload = unknown>(
    url: string,
    body?: unknown,
    config?: THttpClientRequestConfig
  ): Promise<THttpClientResponse<TSuccessPayload>> {
    return httpClient.delete<TSuccessPayload>(url, {
      ...config,
      // This is workaround for setting "content-type":
      // https://github.com/axios/axios/issues/86
      data: body ? body : null,
    });
  }
}

export const requestService = new RequestService();
