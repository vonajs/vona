import { CabloyApplication } from 'vona';

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
