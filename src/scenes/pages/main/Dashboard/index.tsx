import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from 'src/store';

export const DashboardPage: React.FC = observer(() => {
  const store = useMst();
  const logout = () => {
    store.auth.logoutAsync.run();
  };
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <button type='button' onClick={logout}>
        logout
      </button>
    </React.Fragment>
  );
});
