import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// summer
const summer = {
  group: {
    model: {
      userOnline: {
        config: 'all',
        mem: {
          ttl: 10 * 60 * 1000, // 10 minutes
        },
        redis: {
          ttl: 10 * 60 * 1000, // 10 minutes
        },
      },
    },
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
