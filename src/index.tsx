import React from 'react';
import ReactDOM from 'react-dom/client';

import { httpClientConfig } from 'src/core/services/api';
// import reportWebVitals from 'src/reportWebVitals';
import { rootStore } from 'src/store/configureStore/configureStore';
import { setupAuthTokensToStore } from 'src/store/auth/utils';
import { AppContainer } from 'src/app';

const renderApp = (): void => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  try {
    setupAuthTokensToStore(rootStore);
    httpClientConfig.initialize({
      getAccessToken: () => rootStore.auth.tokens.idToken,
      getTokenType: () => rootStore.auth.tokens.tokenType,
      refreshToken: async () => {
        return await rootStore.auth.authRefreshTokenAsync.run();
      },
      logout: () => rootStore.auth.logoutAsync.run(),
    });

    root.render(
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    );
  } catch (err) {
    root.render(
      <React.StrictMode>
        <p>will implement ErrorHandler</p>
      </React.StrictMode>
    );

    throw err;
  }
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
