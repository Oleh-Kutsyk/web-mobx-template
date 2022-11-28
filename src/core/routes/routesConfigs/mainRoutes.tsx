import React from 'react';

import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';
import { MainPageLayout } from 'src/scenes/layouts';
import { NotFound } from 'src/scenes/pages/common/NotFound';
import { DashboardPage } from 'src/scenes/pages/main/Dashboard';

// TODO: investigate why screen is bleeking while navigate pages
// const WatchListInstrumentPage = React.lazy(() =>
//   import(
//     /* webpackChunkName: "WatchListInstrumentPage" */ '../../pages/main/WatchListInstrumentPage'
//     ).then(module => ({
//     default: module.WatchListInstrumentPage,
//   }))
// );

export const mainRoutes: ICustomRouteObject[] = [
  {
    id: `mainRoutes_MainPageLayout`,
    path: ROUTES.main.root,
    element: <MainPageLayout />,
    routeType: ERouteType.Authorized,
    children: [
      {
        id: `mainRoutes_DashboardPage`,
        path: ROUTES.main.home,
        routeType: ERouteType.Authorized,
        element: <DashboardPage />,
      },
      // {
      //   id: `mainRoutes_14`,
      //   path: ROUTES.main.bannerNotifications,
      //   routeType: ERouteType.Authorized,
      //   element: <BannerNotificationLayout />,
      //   children: [
      //     {
      //       id: 'mainRoutes_15',
      //       index: true,
      //       routeType: ERouteType.Authorized,
      //       element: <BannerNotificationPage />,
      //     },
      //     {
      //       id: `mainRoutes_16`,
      //       path: ROUTES.main.createBannerNotification,
      //       routeType: ERouteType.Authorized,
      //       element: <CreateBannerNotificationPage />,
      //     },
      //     {
      //       id: `mainRoutes_17`,
      //       path: ROUTES.main.editBannerNotification,
      //       routeType: ERouteType.Authorized,
      //       element: <EditBannerNotificationPage />,
      //     },
      //   ],
      // },
      {
        id: `mainRoutes_NotFound`,
        path: ROUTES.matchAll,
        routeType: ERouteType.Public,
        element: <NotFound />,
      },
    ],
  },
];
