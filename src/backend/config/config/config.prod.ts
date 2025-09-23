import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // instances
  config.instances = [
    {
      name: '',
      password: '',
      title: '',
      config: {},
    },
  ];

  // database
  config.database = {
    testDatabase: false,
    base: {
      asyncStackTraces: false,
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
