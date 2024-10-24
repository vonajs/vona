import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
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
