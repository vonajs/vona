import type { VonaAppInfo, VonaConfigEnv, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo, _env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // instance
  config.instance = {
    instances: {
      '': { password: '', title: '' },
    },
  };

  // redis
  config.redis = {
    clients: {},
  };

  // database
  config.database = {
    testDatabase: false,
    base: {
      asyncStackTraces: false,
    },
    clients: {
      isolateTest: undefined,
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
