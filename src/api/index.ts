import { Auth } from './auth';

export class Api {
  Auth = new Auth();
}

export const api = new Api();

export type TApi = InstanceType<typeof Api>;
