import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// summer
const summer = {
  group: {
    model: {
      status: {
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
