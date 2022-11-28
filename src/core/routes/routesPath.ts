export const ROUTES = {
  matchAll: '*',

  auth: {
    root: '/auth',
    signUp: 'sign-up',
    signIn: 'sign-in',
    resetPassword: 'reset-password',
  },

  main: {
    root: '/',
    home: '/',

    instruments: '/instruments',
    categories: 'categories',

    bonuses: '/bonuses',

    customerGroups: '/customer-groups',
    createCustomerGroup: 'create',
    editCustomerGroup: ':id/edit',
    duplicateCustomerGroup: ':id/duplicate',

    pushNotifications: '/push-notifications',
    createPushNotification: 'create',
    editPushNotification: ':id/edit',

    bannerNotifications: '/banner-notifications',
    createBannerNotification: 'create',
    editBannerNotification: ':id/edit',

    popUpNotifications: '/pop-up-notifications',
    createPopUpNotification: 'create',
    editPopUpNotification: ':id/edit',

    atmButtonsConfiguration: 'atm-buttons-configuration',
    depositInfo: 'deposit-info',
    atmDepositInfo: 'atm-deposit-info',
    brandConfiguration: 'brand-configuration',
    leverageInfo: 'leverage-info',
  },

  common: {
    notFound: 'not-found',
    accessDenied: 'access-denied',
  },
} as const;
