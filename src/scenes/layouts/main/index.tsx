import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../../stores';

import { Header } from '../../../components/header';
import { SideBar } from '../../../components/sidebar';

import * as Styled from './styled';

export const MainPageLayout: React.FC = observer(() => {
  const store = useMst();

  useEffect(() => {
    store.entities.countries.getCountries.run();
  }, []);

  return (
    <Styled.Wrapper>
      <Header isSidebarOpen={store.ui.sidebar.isOpen} />
      <SideBar
        open={store.ui.sidebar.isOpen}
        onClose={store.ui.sidebar.close}
      />
      <Styled.Main isSidebarOpen={store.ui.sidebar.isOpen}>
        <Outlet />
      </Styled.Main>
    </Styled.Wrapper>
  );
});
