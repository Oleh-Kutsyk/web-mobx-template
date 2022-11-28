import React from 'react';
import { Outlet } from 'react-router-dom';

// import * as Styled from './styled';

export const AuthPageLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
