import React from 'react';
import { observer } from 'mobx-react-lite';

interface IPublicRoute {
  element: React.ReactNode;
}

export const PublicRoute: React.FC<IPublicRoute> = observer(({ element }) => {
  return <>{element}</>;
});
