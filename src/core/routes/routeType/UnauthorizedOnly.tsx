import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ROUTES } from '../routesPath';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useMst } from 'src/store';

interface IUnauthorizedOnlyContainer {
  element: React.ReactNode;
}

export const UnauthorizedOnlyContainer: React.FC<IUnauthorizedOnlyContainer> =
  observer(({ element }) => {
    const store = useMst();
    const navigate = useNavigate();
    const { pathname }: Location = useLocation();

    // Keep this for add check did the userIdentities is confirmed in system
    // if no (but it already register) - go home for example
    // if yes (he can't see login page)

    useEffect(() => {
      // Mb we should use .replace for this case
      if (store.auth.isAuth === true) {
        navigate(ROUTES.main.home);
      }
      if (pathname === ROUTES.auth.root) {
        navigate(ROUTES.auth.signIn);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.auth.isAuth, navigate]);

    return store.auth.isAuth === false ? <>{element}</> : null;
  });
