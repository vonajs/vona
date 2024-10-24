import { IModuleConfigSummer } from 'vona-module-a-summer';

// summer
const summer = {
  group: {
    default: {
      fieldsRightOfAtomClass: {
        bean: 'fieldsRightOfAtomClass',
        config: 'all',
      },
      fieldsRightOfUser: {
        bean: 'fieldsRightOfUser',
        config: 'all',
      },
    },
  },
} as IModuleConfigSummer;

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    summer,
  };
};
