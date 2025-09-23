import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // instances
  config.instances = [
    { name: '', password: '', title: '' },
  ];

  // database
  config.database = {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
