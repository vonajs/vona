import type { VonaApplication } from 'vona';
import type { IOnionOptionsMeta } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions, TSummerCachePreset } from '../types/summerCache.ts';

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

export function config(_app: VonaApplication) {
  return {
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
}
