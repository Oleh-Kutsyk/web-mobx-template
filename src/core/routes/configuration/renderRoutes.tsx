import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AuthorizedContainer as AuthorizedRoute,
  UnauthorizedOnlyContainer as UnauthorizedRoute,
  PublicRoute,
} from '../routeType';
import { ERouteType, ICustomRouteObject } from './routeTypes';

import { WithErrorBoundary } from 'src/scenes/pages/common/ErrorBoundary';

interface IRenderComponentByRouteType {
  route: ICustomRouteObject;
}

const RenderComponentByRouteType: React.FC<IRenderComponentByRouteType> = ({
  route,
}) => {
  if (route.routeType === ERouteType.Authorized) {
    return <AuthorizedRoute element={route.element} />;
  }

  if (route.routeType === ERouteType.UnauthorizedOnly) {
    return <UnauthorizedRoute element={route.element} />;
  }

  return <PublicRoute element={route.element} />;
};

interface IProps {
  routes: ICustomRouteObject[];
}

const getRouteMap = (props: IProps) => {
  return props.routes.map(route => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Route
        index={route.index}
        path={route.path}
        element={<RenderComponentByRouteType route={route} />}
        key={route.id}
      >
        {getChildrenRouteMap(route.children)}
      </Route>
    );
  });
};

const getChildrenRouteMap = (children: ICustomRouteObject['children']) => {
  if (children?.length) {
    return children?.map(childRoute => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Route
        index={childRoute.index}
        path={childRoute.path}
        element={<RenderComponentByRouteType route={childRoute} />}
        key={childRoute.id}
      >
        {childRoute?.children?.length &&
          getChildrenRouteMap(childRoute.children)}
      </Route>
    ));
  }
  return null;
};

export const RenderRoutes: React.FC<IProps> = props => {
  const routes = useMemo(() => getRouteMap(props), [props]);

  return (
    <WithErrorBoundary>
      <Routes>{routes}</Routes>
    </WithErrorBoundary>
  );
};
