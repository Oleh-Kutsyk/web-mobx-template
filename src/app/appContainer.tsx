import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  rootStore,
  RootStoreProvider,
} from 'src/store/configureStore/configureStore';
import { browserHistoryInstance } from '../core/history';
import { App } from './app';

export const AppContainer: React.FC = () => {
  return (
    <BrowserRouter {...browserHistoryInstance}>
      <RootStoreProvider value={rootStore}>
        <App />
      </RootStoreProvider>
    </BrowserRouter>
  );
};
