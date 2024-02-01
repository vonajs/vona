import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// summer
const summer = {
  group: {
    model: {
      flowTask: {
        config: 'redis',
      },
      flowTaskHistory: {
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
