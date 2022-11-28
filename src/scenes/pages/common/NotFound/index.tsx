import React from 'react';

import { useNavigation } from '../../../../hooks';

import { PageTitle } from '../../../../components/pageTitle';
import { Button } from '../../../../components/button';

import * as Styled from './styled';

export const NotFound: React.FC = () => {
  const { goBackNavigate } = useNavigation();

  return (
    <Styled.Root>
      <PageTitle>Page Not Found</PageTitle>
      <Button color='inherit' onClick={goBackNavigate}>
        Go Back
      </Button>
    </Styled.Root>
  );
};
