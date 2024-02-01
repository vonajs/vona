import { IModuleConfigBroadcast } from '@cabloy/core';
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

const configRedis = {
  mode: 'redis', // only redis
  redis: {
    ttl: 2 * 60 * 60 * 1000, // 2 hours
  },
  ignoreNull: true,
} as IModuleConfigSummerCache;

const configRedisWithIgnoreNull = { ...configRedis, ignoreNull: true };

const configAll = {
  mode: 'all',
  mem: {
    max: 500,
  },
  redis: {
    ttl: 2 * 60 * 60 * 1000, // 2 hours
  },
} as IModuleConfigSummerCache;

const configAllWithIgnoreNull = { ...configAll, ignoreNull: true };

export const config = _app => {
  return {
    broadcasts,
    summer: {
      enable: true,
      config: {
        group: {
          default: {
            redis: configRedis,
            redisWithIgnoreNull: configRedisWithIgnoreNull,
            all: configAll,
            allWithIgnoreNull: configAllWithIgnoreNull,
          },
          model: {
            redis: configRedis,
            redisWithIgnoreNull: configRedisWithIgnoreNull,
            all: configAll,
            allWithIgnoreNull: configAllWithIgnoreNull,
          },
        },
      },
    },
  };
};
