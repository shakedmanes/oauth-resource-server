// resources.mock

import config from '../config';

// Mock resources for files associated to end users and servers
export const resources: { [resourceOwner: string]: { filesPath: string }; } = {
  '5b829d9efb6fc0183b412bdf': {
    filesPath: config.resourcesPath('5b829d9efb6fc0183b412bdf'),
  },
  '5bd1af6cfb6fc017d2e6404a': {
    filesPath: config.resourcesPath('5bd1af6cfb6fc017d2e6404a'),
  },
  OAUTH_CONSUMER_CLIENT_ID: {
    filesPath: config.resourcesPath(''),
  },
};
