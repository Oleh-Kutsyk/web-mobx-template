import React from 'react';
import { AuthPageLayout } from '../../../scenes/layouts';
import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';
import { LoginPage } from '../../../scenes/pages/auth/LoginPage';
import { NotFound } from '../../../scenes/pages/common/NotFound';

export const authRoutes: ICustomRouteObject[] = [
  {
    id: `authRoutes_1`,
    path: ROUTES.auth.root,
    element: <AuthPageLayout />,
    routeType: ERouteType.UnauthorizedOnly,
    children: [
      {
        id: `authRoutes_2`,
        path: ROUTES.auth.signIn,
        routeType: ERouteType.UnauthorizedOnly,
        element: <LoginPage />,
      },
      {
        id: `mainRoutes_3`,
        path: ROUTES.matchAll,
        routeType: ERouteType.Public,
        element: <NotFound />,
      },
    ],
  },
];
