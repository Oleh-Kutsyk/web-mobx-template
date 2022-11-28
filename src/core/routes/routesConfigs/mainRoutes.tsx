import React from 'react';
import {
  MainPageLayout,
  PopUpNotificationLayout,
  PushNotificationLayout,
  BannerNotificationLayout,
  WatchListLayout,
} from '../../../scenes/layouts';
import { ERouteType, ICustomRouteObject } from '../configuration';
import { ROUTES } from '../routesPath';

import { Instruments } from '../../../scenes/pages/main/Instruments';
import { DepositInfoPage } from '../../../scenes/pages/main/DepositInfoPage';
import { BrandConfigurationPage } from '../../../scenes/pages/main/BrandConfigurationPage';
import { AtmDepositInfoPage } from '../../../scenes/pages/main/AtmDepositInfoPage';
import { LeverageInfoPage } from '../../../scenes/pages/main/LeverageInfoPage';
import { PushNotificationPage } from '../../../scenes/pages/main/PushNotificationPage';
import { BannerNotificationPage } from '../../../scenes/pages/main/BannerNotificationPage';
import { CreateBannerNotificationPage } from '../../../scenes/pages/main/BannerNotificationPage/components/createBannerNotification';
import { EditBannerNotificationPage } from '../../../scenes/pages/main/BannerNotificationPage/components/editBannerNotification';
import { PopUpNotificationPage } from '../../../scenes/pages/main/PopUpNotificationPage';
import { CreatePopUpNotificationPage } from '../../../scenes/pages/main/PopUpNotificationPage/components/createPopUpNotification';
import { EditPopUpNotificationPage } from '../../../scenes/pages/main/PopUpNotificationPage/components/editPopUpNotification';
import { DashboardPage } from '../../../scenes/pages/main/Dashboard';
import { NotFound } from '../../../scenes/pages/common/NotFound';
import { CreateCustomerGroup } from '../../../scenes/pages/main/CreateCustomerGroup';
import { CustomerGroupsLayout } from '../../../scenes/layouts/customerGroups';
import { CustomerGroups } from '../../../scenes/pages/main/CustomerGroups';
import { BonusesPage } from '../../../scenes/pages/main/BonusesPage';

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
    id: `mainRoutes_1`,
    path: ROUTES.main.root,
    element: <MainPageLayout />,
    routeType: ERouteType.Authorized,
    children: [
      {
        id: `mainRoutes_2`,
        path: ROUTES.main.home,
        routeType: ERouteType.Authorized,
        element: <DashboardPage />,
      },
      {
        id: `mainRoutes_3`,
        path: ROUTES.main.instruments,
        routeType: ERouteType.Authorized,
        element: <WatchListLayout />,
        children: [
          {
            id: 'mainRoutes_4',
            index: true,
            routeType: ERouteType.Authorized,
            element: <Instruments />,
          },
        ],
      },
      {
        id: `mainRoutes_6`,
        path: ROUTES.main.depositInfo,
        routeType: ERouteType.Authorized,
        element: <DepositInfoPage />,
      },
      {
        id: `mainRoutes_7`,
        path: ROUTES.main.brandConfiguration,
        routeType: ERouteType.Authorized,
        element: <BrandConfigurationPage />,
      },
      {
        id: `mainRoutes_8`,
        path: ROUTES.main.atmDepositInfo,
        routeType: ERouteType.Authorized,
        element: <AtmDepositInfoPage />,
      },
      {
        id: `mainRoutes_9`,
        path: ROUTES.main.leverageInfo,
        routeType: ERouteType.Authorized,
        element: <LeverageInfoPage />,
      },
      {
        id: `mainRoutes_10`,
        path: ROUTES.main.pushNotifications,
        routeType: ERouteType.Authorized,
        element: <PushNotificationLayout />,
        children: [
          {
            id: 'mainRoutes_11',
            index: true,
            routeType: ERouteType.Authorized,
            element: <PushNotificationPage />,
          },
        ],
      },
      {
        id: `mainRoutes_14`,
        path: ROUTES.main.bannerNotifications,
        routeType: ERouteType.Authorized,
        element: <BannerNotificationLayout />,
        children: [
          {
            id: 'mainRoutes_15',
            index: true,
            routeType: ERouteType.Authorized,
            element: <BannerNotificationPage />,
          },
          {
            id: `mainRoutes_16`,
            path: ROUTES.main.createBannerNotification,
            routeType: ERouteType.Authorized,
            element: <CreateBannerNotificationPage />,
          },
          {
            id: `mainRoutes_17`,
            path: ROUTES.main.editBannerNotification,
            routeType: ERouteType.Authorized,
            element: <EditBannerNotificationPage />,
          },
        ],
      },
      {
        id: `mainRoutes_18`,
        path: ROUTES.main.popUpNotifications,
        routeType: ERouteType.Authorized,
        element: <PopUpNotificationLayout />,
        children: [
          {
            id: 'mainRoutes_19',
            index: true,
            routeType: ERouteType.Authorized,
            element: <PopUpNotificationPage />,
          },
          {
            id: `mainRoutes_20`,
            path: ROUTES.main.createPopUpNotification,
            routeType: ERouteType.Authorized,
            element: <CreatePopUpNotificationPage />,
          },
          {
            id: `mainRoutes_21`,
            path: ROUTES.main.editPopUpNotification,
            routeType: ERouteType.Authorized,
            element: <EditPopUpNotificationPage />,
          },
        ],
      },
      {
        id: `mainRoutes_22`,
        path: ROUTES.main.customerGroups,
        routeType: ERouteType.Authorized,
        element: <CustomerGroupsLayout />,
        children: [
          {
            id: 'mainRoutes_23',
            index: true,
            routeType: ERouteType.Authorized,
            element: <CustomerGroups />,
          },
          {
            id: `mainRoutes_24`,
            path: ROUTES.main.createCustomerGroup,
            routeType: ERouteType.Authorized,
            element: <CreateCustomerGroup />,
          },
          {
            id: `mainRoutes_25`,
            path: ROUTES.main.editCustomerGroup,
            routeType: ERouteType.Authorized,
            element: <CreateCustomerGroup />,
          },
          {
            id: `mainRoutes_26`,
            path: ROUTES.main.duplicateCustomerGroup,
            routeType: ERouteType.Authorized,
            element: <CreateCustomerGroup />,
          },
        ],
      },
      // TODO: temporary page, delete in the future
      {
        id: `mainRoutes_27`,
        path: ROUTES.main.bonuses,
        routeType: ERouteType.Authorized,
        element: <BonusesPage />,
      },
      {
        id: `mainRoutes_28`,
        path: ROUTES.matchAll,
        routeType: ERouteType.Public,
        element: <NotFound />,
      },
    ],
  },
];
