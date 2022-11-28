import React, { useState, useEffect } from 'react';
import { CssBaseline as MuiCssBaseline } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { ThemeProvider as StyledCompThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { getTheme, ITheme } from '../themes';
import { GlobalStyles } from './styles';
import { RenderRoutesWithSuspense } from '../core/routes/configuration';
import { routes } from '../core/routes/routes';
import { NotificationContainer } from '../components/notification';
import { SnackbarProvider } from '../providers';
import { i18n } from '../core/i18n';
import { useMst } from '../stores';
import { Modals } from '../modals';

interface IAppState {
  theme: ITheme;
}

export const App: React.FC = observer(() => {
  const store = useMst();
  const [appState] = useState<IAppState>({
    theme: getTheme(),
  });
  useEffect(() => {
    store.auth.checkAuthAsync.run();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={appState.theme}>
        <StyledCompThemeProvider theme={appState.theme}>
          <StyledEngineProvider injectFirst>
            <MuiCssBaseline />
            <GlobalStyles />
            <SnackbarProvider>
              {store.auth.isAuthChecked ? (
                <React.Fragment>
                  <RenderRoutesWithSuspense routes={routes} />
                  <Modals />
                </React.Fragment>
              ) : null}
              <NotificationContainer />
            </SnackbarProvider>
          </StyledEngineProvider>
        </StyledCompThemeProvider>
      </MuiThemeProvider>
    </I18nextProvider>
  );
});
