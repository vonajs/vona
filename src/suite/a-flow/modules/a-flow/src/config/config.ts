import { IModuleConfigSummer, IModuleConfigSummerCache } from '@cabloy/core';

// summer
const summer = {
  caches: {
    modelFlow: {
      mode: 'redis', // only redis
      redis: {
        ttl: 2 * 60 * 60 * 1000, // 2 hours
      },
    } as IModuleConfigSummerCache,
    modelFlowHistory: {
      mode: 'redis', // only redis
      redis: {
        ttl: 2 * 60 * 60 * 1000, // 2 hours
      },
    } as IModuleConfigSummerCache,
    modelFlowNode: {
      mode: 'redis', // only redis
      redis: {
        ttl: 2 * 60 * 60 * 1000, // 2 hours
      },
    } as IModuleConfigSummerCache,
    modelFlowNodeHistory: {
      mode: 'redis', // only redis
      redis: {
        ttl: 2 * 60 * 60 * 1000, // 2 hours
      },
    } as IModuleConfigSummerCache,
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    summer,
  };
};
