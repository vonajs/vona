import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    account: {
      github: {
        scenes: {
          default: {
            title: 'AuthDefault',
            clientID: '',
            clientSecret: '',
          },
        },
      },
    },
  };
};
