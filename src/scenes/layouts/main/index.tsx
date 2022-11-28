import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMst } from 'src/store';

// import * as Styled from './styled';

export const MainPageLayout: React.FC = observer(() => {
  const store = useMst();

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    console.log('store', JSON.stringify(store, null, 2));
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
});
