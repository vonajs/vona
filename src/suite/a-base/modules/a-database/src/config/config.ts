import { IOnionOptionsMeta, VonaApplication } from 'vona';
import {
  configAll,
  configAllWithIgnoreNull,
  configRedis,
  configRedisWithIgnoreNull,
  TSummerCachePreset,
} from 'vona-module-a-summer';

export const config = (_app: VonaApplication) => {
  return {
    summer: {
      enable: true,
      meta: {} as IOnionOptionsMeta,
      presetDefault: 'redis' as TSummerCachePreset,
      preset: {
        redis: configRedis,
        redisWithIgnoreNull: configRedisWithIgnoreNull,
        all: configAll,
        allWithIgnoreNull: configAllWithIgnoreNull,
      },
      redis: {
        client: 'model',
      },
    },
  };
};
