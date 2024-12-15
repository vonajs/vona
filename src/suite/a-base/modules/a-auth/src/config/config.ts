import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    login: {
      providers: [
        {
          module: 'a-authsimple',
          provider: 'authsimple',
        },
        {
          module: 'a-authsms',
          provider: 'authsms',
        },
        {
          module: 'a-authgithub',
          provider: 'authgithub',
        },
      ],
    },
  };
};
