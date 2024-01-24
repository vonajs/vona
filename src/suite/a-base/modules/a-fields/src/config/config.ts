import { IModuleConfigSummer, IModuleConfigSummerCache } from '@cabloy/core';

// summer
const summer = {
  caches: {
    fieldsRightOfAtomClass: {
      bean: 'fieldsRightOfAtomClass',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    } as IModuleConfigSummerCache,
    fieldsRightOfUser: {
      bean: 'fieldsRightOfUser',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    } as IModuleConfigSummerCache,
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    summer,
  };
};
