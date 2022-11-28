import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ERouteType, ICustomRouteObject } from './routeTypes';
import { WithErrorBoundary } from '../../../scenes/pages/common/ErrorBoundary';
import {
  AuthorizedContainer as AuthorizedRoute,
  UnauthorizedOnlyContainer as UnauthorizedRoute,
  PublicRoute,
} from '../routeType';

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

export const RenderRoutesWithSuspense: React.FC<IProps> = props => {
  const routes = useMemo(() => getRouteMap(props), [props]);

  return (
    <WithErrorBoundary>
      <Routes>{routes}</Routes>
    </WithErrorBoundary>
  );
};
