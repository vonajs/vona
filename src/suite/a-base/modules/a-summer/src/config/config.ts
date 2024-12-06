import { VonaApplication, IModuleConfigBroadcast, IMiddlewareOptionsMeta } from 'vona';
import { IModuleConfigSummerCache } from './types.js';

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
} as IModuleConfigSummerCache;

export const configRedisWithIgnoreNull = { ...configRedis, ignoreNull: true };

export const configAll = {
  mode: 'all',
  mem: {
    max: 500,
  },
  redis: {
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IModuleConfigSummerCache;

export const configAllWithIgnoreNull = { ...configAll, ignoreNull: true };

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
    summer: {
      enable: true,
      meta: {} as IMiddlewareOptionsMeta,
      preset: {
        redis: configRedis,
        redisWithIgnoreNull: configRedisWithIgnoreNull,
        all: configAll,
        allWithIgnoreNull: configAllWithIgnoreNull,
      },
    },
  };
};
