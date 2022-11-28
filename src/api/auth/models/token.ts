export interface IGetAuthTokenBE {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface IGetAuthTokenParams {
  username: string;
  password: string;
}

export interface IGetAuthRefreshTokenBE {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  tokenType: string;
}

export interface IGetAuthRefreshTokenParams {
  refreshToken: string;
}

export interface IGlobalSignOutBEParams {
  accessToken: string;
}
