import { VonaApplication, IModuleConfigBroadcast } from 'vona';

// broadcasts
const broadcasts = {
  authProviderChanged: {
    bean: 'authProviderChanged',
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
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
