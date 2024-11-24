import { VonaApplication } from 'vona';
import { IModuleConfigSummer } from 'vona-module-a-summer';

// summer
const summer = {
  group: {
    default: {
      test: {
        bean: 'test',
        mode: 'all', // mem/redis/all
        mem: {
          max: 2,
          ttl: 1 * 1000,
        },
        redis: {
          ttl: 3 * 1000,
        },
      },
    },
  },
} as IModuleConfigSummer;

export const config = (_app: VonaApplication) => {
  return {
    summer,
  };
};
