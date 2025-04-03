import type { VonaApplication } from 'vona';
import type { IOnionOptionsMeta } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions, TSummerCachePreset } from '../types/summerCache.ts';

export const configMem = {
  mode: 'mem', // only mem
  mem: {
    max: 500,
    broadcastOnSet: 'del',
  },
} as IDecoratorSummerCacheOptions;

export const configMemWithIgnoreNull = { ...configMem, ignoreNull: true };

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
    broadcastOnSet: 'del',
  },
  redis: {
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IDecoratorSummerCacheOptions;

export const configAllWithIgnoreNull = { ...configAll, ignoreNull: true };

export function config(_app: VonaApplication) {
  return {
    summer: {
      enable: true,
      meta: {} as IOnionOptionsMeta,
      presetDefault: 'all' as TSummerCachePreset,
      preset: {
        mem: configMem,
        memWithIgnoreNull: configMemWithIgnoreNull,
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
}
