import { ICustomRouteObject } from './configuration';

import { commonRoutes, authRoutes, mainRoutes } from './routesConfigs';

export const routes: ICustomRouteObject[] = [
  ...commonRoutes,
  ...authRoutes,

  // mainRoutes should be last because in other routes we have redirect
  // to '/some/path' which match '/' (over home page) from other routes
  ...mainRoutes,
];
