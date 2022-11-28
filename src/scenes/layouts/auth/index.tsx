import React from 'react';
import { Outlet } from 'react-router-dom';
import { Styled } from './styled';

export const AuthPageLayout: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Outlet />
    </Styled.Wrapper>
  );
};
