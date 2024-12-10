import { VonaApplication, IModuleConfigBroadcast } from 'vona';

// broadcasts
const broadcasts = {
  socketEmit: {
    bean: 'socketEmit',
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
    message: {
      sync: {
        saveLimit: 200,
      },
    },
  };
};
