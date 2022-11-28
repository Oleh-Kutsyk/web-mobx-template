import { RouteObject } from 'react-router/lib/router';

export enum ERouteType {
  Public = 'Public',
  Authorized = 'Authorized',
  UnauthorizedOnly = 'UnauthorizedOnly',
}

export interface ICustomRouteObject
  extends Omit<RouteObject, 'children' | 'path'> {
  id: string;
  path?: string;
  routeType: ERouteType;
  children?: ICustomRouteObject[];
}
