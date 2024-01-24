import { IModuleConfigSummer, IModuleConfigSummerCache } from '@cabloy/core';

// summer
const summer = {
  caches: {
    modelStatus: {
      mode: 'redis', // only redis
      // mem: {
      //   max: 500,
      // },
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
