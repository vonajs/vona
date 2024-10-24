import { VonaApplication, IModuleConfigBroadcast, IModuleConfigStartup } from 'vona';

// startups
const startups = {
  registerPassport: {
    bean: 'registerPassport',
  } as IModuleConfigStartup,
  registerRouters: {
    bean: 'registerRouters',
  } as IModuleConfigStartup,
  cacheAuthProviders: {
    bean: 'cacheAuthProviders',
    instance: true,
  } as IModuleConfigStartup,
};

// broadcasts
const broadcasts = {
  authProviderChanged: {
    bean: 'authProviderChanged',
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    startups,
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
