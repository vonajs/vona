import { CabloyApplication, IModuleConfigBroadcast } from '@cabloy/core';
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
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IModuleConfigSummerCache;

const configRedisWithIgnoreNull = { ...configRedis, ignoreNull: true };

const configAll = {
  mode: 'all',
  mem: {
    max: 500,
  },
  redis: {
    ttl: 20 * 60 * 1000, // 20 minutes
  },
} as IModuleConfigSummerCache;

const configAllWithIgnoreNull = { ...configAll, ignoreNull: true };

export const config = (_app: CabloyApplication) => {
  return {
    broadcasts,
    summer: {
      enable: true,
      group: {
        default: { dynamic: false },
        model: { dynamic: true, configDefault: 'redis' },
      },
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
