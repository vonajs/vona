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

export const config = _app => {
  return {
    broadcasts,
    summer: {
      enable: true,
      group: {
        default: {
          default: null,
          dynamic: false,
        },
        model: {
          default: {
            mode: 'redis', // only redis
            redis: {
              ttl: 2 * 60 * 60 * 1000, // 2 hours
            },
          } as IModuleConfigSummerCache,
          dynamic: true,
        },
      },
    },
  };
};
