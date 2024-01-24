import { IModuleConfigSummer, IModuleConfigSummerCache } from '@cabloy/core';

// summer
const summer = {
  caches: {
    modelUserOnline: {
      bean: null,
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 10 * 60 * 1000, // 10 minutes
      },
    } as IModuleConfigSummerCache,
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    summer,
    userOnline: {
      expired: 20 * 60 * 1000, // 20 minutes
    },
  };
};
