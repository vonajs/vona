import { VonaApplication, IModuleConfigBroadcast, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  registerMessageClass: {
    bean: 'registerMessageClass',
  } as IModuleConfigQueue,
};

// broadcasts
const broadcasts = {
  socketEmit: {
    bean: 'socketEmit',
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    queues,
    broadcasts,
    message: {
      sync: {
        saveLimit: 200,
      },
    },
  };
};
