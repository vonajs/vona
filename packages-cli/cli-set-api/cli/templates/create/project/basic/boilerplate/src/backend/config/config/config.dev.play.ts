import type { VonaApplication, VonaConfigEnv, VonaConfigOptional } from 'vona';

export default async function (_app: VonaApplication, _env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // instance
  config.instance = {
    instances: {
      '': { password: '', title: '' },
      'shareTest': false,
      'isolateTest': false,
    },
  };

  // redis
  config.redis = {
    clients: {},
  };

  // database
  config.database = {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
    clients: {},
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
