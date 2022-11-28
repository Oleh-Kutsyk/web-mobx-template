export interface IGetAuthTokenBE {
  accessToken: string; // nullable ===  ''
  expiresIn: number; // integer($int32)
  idToken: string; // nullable ===  ''
  refreshToken: string; // nullable ===  ''
  tokenType: string; // nullable ===  ''
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
