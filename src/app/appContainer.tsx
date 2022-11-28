import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  RootStoreProvider,
  rootStore,
} from '../stores/configureStore/configureStore';
import { App } from './app';
import { browserHistoryInstance } from '../core/history';

export const AppContainer: React.FC = () => {
  return (
    <BrowserRouter {...browserHistoryInstance}>
      <RootStoreProvider value={rootStore}>
        <App />
      </RootStoreProvider>
    </BrowserRouter>
  );
};
