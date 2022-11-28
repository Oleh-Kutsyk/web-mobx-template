import React from 'react';

import { observer } from 'mobx-react-lite';
import { routes } from '../core/routes/routes';
import { RenderRoutes } from 'src/core/routes/configuration';

export const App: React.FC = observer(() => {
  return (
    // <I18nextProvider i18n={i18n}>
    //   <MuiThemeProvider theme={appState.theme}>
    //     <StyledCompThemeProvider theme={appState.theme}>
    //       <StyledEngineProvider injectFirst>
    //         <MuiCssBaseline />
    //         <GlobalStyles />
    <React.Fragment>
      <RenderRoutes routes={routes} />
      {/*<Modals />*/}
    </React.Fragment>
    //<NotificationContainer />
    // </StyledEngineProvider>
    // </StyledCompThemeProvider>
    // </MuiThemeProvider>
    // </I18nextProvider>
  );
});
