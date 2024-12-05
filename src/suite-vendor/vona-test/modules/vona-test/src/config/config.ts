import { VonaApplication } from 'vona';
import { IModuleConfigSummer } from 'vona-module-a-summer';

// summer
const summer = {
  group: {
    default: {
      test: {},
    },
  },
} as IModuleConfigSummer;

export const config = (_app: VonaApplication) => {
  return {
    summer,
  };
};
