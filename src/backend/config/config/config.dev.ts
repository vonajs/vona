import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // instances
  config.instances = [
    { name: '', password: '', title: '' },
    { name: 'shareTest', password: '', title: '' },
    { name: 'isolateTest', password: '', title: '', id: 1000, isolate: true, isolateClient: 'isolateTest' },
  ];

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
