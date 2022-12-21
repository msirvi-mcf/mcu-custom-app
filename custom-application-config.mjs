import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name: 'Mcu',
  entryPointUriPath,
  cloudIdentifier: 'gcp-us',
  env: {
    development: {
      initialProjectKey: 'mcu-test',
    },

    production: {
      applicationId: 'clbxajxo0004rvr010vod1txk',
      url: 'https://mcu-custom-app.pages.dev',
    },
  },

  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },

  icon: '${path:@commercetools-frontend/assets/application-icons/mirakl.svg}',
  mainMenuLink: {
    defaultLabel: 'Mirakl',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },

  submenuLinks: [
    {
      uriPath: 'dashboard',
      defaultLabel: 'Dashboard',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'data',
      defaultLabel: 'Data',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'processes',
      defaultLabel: 'Processes',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'settings',
      defaultLabel: 'Settings',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'logs',
      defaultLabel: 'Logs',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    }

  ],
};

export default config;
