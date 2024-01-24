import { IModuleConfigQueue, IModuleConfigSummer, IModuleConfigSummerCache } from '@cabloy/core';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

// summer
const summer = {
  caches: {
    modelStats: {
      mode: 'redis', // only redis
      // mem: {
      //   max: 500,
      // },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    } as IModuleConfigSummerCache,
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    queues,
    summer,
  };
};
