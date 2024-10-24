import { IModuleConfigSummer } from 'vona-module-a-summer';

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

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    summer,
    userOnline: {
      expired: 20 * 60 * 1000, // 20 minutes
    },
  };
};
