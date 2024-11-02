import { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // modules
  config.modules = {};

  // redis
  config.redis = {
    default: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  return config;
}
