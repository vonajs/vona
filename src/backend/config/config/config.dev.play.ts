import type { VonaAppInfo, VonaConfigEnv, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo, _env: VonaConfigEnv) {
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
