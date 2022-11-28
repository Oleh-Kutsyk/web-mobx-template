import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routesPath';
import { useMst } from 'src/store';
import { checkAppVersion } from 'src/utils';

interface IAuthorizedContainer {
  element: React.ReactNode;
}

export const AuthorizedContainer: React.FC<IAuthorizedContainer> = observer(
  ({ element }) => {
    const navigate = useNavigate();
    const store = useMst();

    useEffect(() => {
      checkAppVersion(store);

      if (store.auth.isAuth === false) {
        navigate(ROUTES.auth.root);
      }
    }, [navigate, store.auth.isAuth]);

    return store.auth.isAuth === true ? <>{element}</> : null;
  }
);
