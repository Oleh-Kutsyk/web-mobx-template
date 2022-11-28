export const authRoutes = {
  baseUrl: '/auth' as const,
  token: '/token' as const,
  refreshToken: (refreshToken?: string) =>
    `/refresh-token?refreshToken=${refreshToken}` as const,
  globalSignOut: '/global-sign-out' as const,
  user: (userId: string) => `${authRoutes.baseUrl}/user/${userId}` as const,
} as const;
