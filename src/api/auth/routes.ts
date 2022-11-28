const baseUrl = '/auth' as const;

// TODO: change authRoutes, it's an example
export const authRoutes = {
  baseUrl,
  token: `${baseUrl}/token`,
  refreshToken: (refreshToken?: string) =>
    `${baseUrl}/refresh-token?refreshToken=${refreshToken}`,
  globalSignOut: `${baseUrl}/global-sign-out`,
  user: (userId: string) => `${baseUrl}/${authRoutes.baseUrl}/user/${userId}`,
} as const;
