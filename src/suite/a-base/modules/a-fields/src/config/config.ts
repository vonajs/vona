import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

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

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    summer,
  };
};
