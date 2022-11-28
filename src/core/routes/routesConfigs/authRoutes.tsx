import React from 'react';

import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';

import { AuthPageLayout } from 'src/scenes/layouts';
import { LoginPage } from 'src/scenes/pages/auth/LoginPage';
import { NotFound } from 'src/scenes/pages/common/NotFound';

export const authRoutes: ICustomRouteObject[] = [
  {
    id: `authRoutes_AuthPageLayout`,
    path: ROUTES.auth.root,
    element: <AuthPageLayout />,
    routeType: ERouteType.UnauthorizedOnly,
    children: [
      {
        id: `authRoutes_LoginPage`,
        path: ROUTES.auth.signIn,
        routeType: ERouteType.UnauthorizedOnly,
        element: <LoginPage />,
      },
      {
        id: `mainRoutes_NotFound`,
        path: ROUTES.matchAll,
        routeType: ERouteType.Public,
        element: <NotFound />,
      },
    ],
  },
];
