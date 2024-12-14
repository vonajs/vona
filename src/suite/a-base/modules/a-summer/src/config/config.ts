import { VonaApplication, IModuleConfigBroadcast, IOnionOptionsMeta } from 'vona';
import { IDecoratorSummerCacheOptions, TSummerCachePreset } from '../types/summerCache.js';

// broadcasts
const broadcasts = {
  memDel: {
    bean: 'memDel',
  } as IModuleConfigBroadcast,
  memMultiDel: {
    bean: 'memMultiDel',
  } as IModuleConfigBroadcast,
  memClear: {
    bean: 'memClear',
  } as IModuleConfigBroadcast,
};

export const configRedis = {
  mode: 'redis', // only redis
  redis: {
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IDecoratorSummerCacheOptions;

export const configRedisWithIgnoreNull = { ...configRedis, ignoreNull: true };

export const configAll = {
  mode: 'all',
  mem: {
    max: 500,
  },
  redis: {
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IDecoratorSummerCacheOptions;

export const configAllWithIgnoreNull = { ...configAll, ignoreNull: true };

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
    summer: {
      enable: true,
      meta: {} as IOnionOptionsMeta,
      presetDefault: 'all' as TSummerCachePreset,
      preset: {
        redis: configRedis,
        redisWithIgnoreNull: configRedisWithIgnoreNull,
        all: configAll,
        allWithIgnoreNull: configAllWithIgnoreNull,
      },
      redis: {
        client: 'summer',
      },
    },
  };
};
