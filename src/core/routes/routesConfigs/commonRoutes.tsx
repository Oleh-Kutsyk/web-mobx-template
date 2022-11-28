import React from 'react';

import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';
import { NotFound } from 'src/scenes/pages/common/NotFound';
import { AccessDenied } from 'src/scenes/pages/common/AccessDenied';

export const commonRoutes: ICustomRouteObject[] = [
  {
    id: `commonRoutes_NotFound`,
    path: ROUTES.common.notFound,
    routeType: ERouteType.Public,
    element: <NotFound />,
  },
  {
    id: 'commonRoutes_AccessDenied',
    path: ROUTES.common.accessDenied,
    routeType: ERouteType.Public,
    element: <AccessDenied />,
  },
];
