// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const { version } = require('../../package.json');

export const environment = {
  production: false,
  appVersion: `${version}-dev`,
  authApiUrl: 'http://localhost:3000/api/auth/',
  fakeStoreApiUrl: 'https://fakestoreapi.com',
  checkoutUrl: 'http://localhost:4242/checkout',
  stripeApiKey: 'pk_test_51M69gQF9QwAxJD1i6qvyd5egsbkxaQbwr1qDQljh0VkYg0yHDZYsZpbBvsNXO3fRQDdWPIRbQg3It11p52AjypZI00ZW0jHdyI',
  settings: {
    auth: {
      // Auth credentials
      clientId: 'fake-client-id',

      // keys to store tokens at local storage
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
