import React from 'react';
import { observer } from 'mobx-react-lite';
import { PageTitle } from '../../../../components/pageTitle';
import { Brands } from './components/brands';
import { AppVersion } from '../../../../components/AppVersion';

export const DashboardPage: React.FC = observer(() => {
  return (
    <React.Fragment>
      <PageTitle>Dashboard</PageTitle>
      <Brands />
      <AppVersion />
    </React.Fragment>
  );
});
