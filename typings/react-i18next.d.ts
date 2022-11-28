/* eslint-disable @typescript-eslint/naming-convention */
// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only) in the JSON format
import common from '../public/locales/en/common.json';
import login from '../public/locales/en/login.json';
import validation from '../public/locales/en/validation.json';

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    login: typeof login;
    common: typeof common;
    validation: typeof validation;
  }
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common';
    // custom resources type
    resources: {
      login: typeof login;
      common: typeof common;
      validation: typeof validation;
    };
  }
}
