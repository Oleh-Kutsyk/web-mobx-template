import React from 'react';

import { useNavigation } from 'src/hooks';

// import * as Styled from './styled';

export const NotFound: React.FC = () => {
  const { goBackNavigate } = useNavigation();

  return (
    <div>
      <h1>Page Not Found</h1>
      <button type='button' onClick={goBackNavigate}>
        Go Back
      </button>
    </div>
  );
};
