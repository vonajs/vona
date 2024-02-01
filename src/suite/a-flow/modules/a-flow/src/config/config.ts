import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// summer
const summer = {
  group: {
    model: {
      flow: {
        config: 'redis',
      },
      flowHistory: {
        config: 'redis',
      },
      flowNode: {
        config: 'redis',
      },
      flowNodeHistory: {
        config: 'redis',
      },
    },
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    summer,
  };
};
