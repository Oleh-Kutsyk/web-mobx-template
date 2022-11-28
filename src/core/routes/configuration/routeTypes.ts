import { RouteObject } from 'react-router-dom';

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
