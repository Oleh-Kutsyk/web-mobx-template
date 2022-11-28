import React from 'react';

import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';

import { AccessDenied } from '../../../scenes/pages/common/AccessDenied';
import { NotFound } from '../../../scenes/pages/common/NotFound';

export const commonRoutes: ICustomRouteObject[] = [
  {
    id: `commonRoutes_1`,
    path: ROUTES.common.notFound,
    routeType: ERouteType.Public,
    element: <NotFound />,
  },
  {
    id: 'commonRoutes_2',
    path: ROUTES.common.accessDenied,
    routeType: ERouteType.Public,
    element: <AccessDenied />,
  },
];
