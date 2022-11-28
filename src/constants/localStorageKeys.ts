export const LOCAL_STORAGE_KEYS = {
  tokens: {
    access: 'access_token',
    refresh: 'refresh_token',
    idToken: 'id_token',
    expiresIn: 'expires_in_token',
    tokenType: 'token_type_token',
  },
  persist: 'persist_store',
  appVersion: 'app_version',
} as const;
