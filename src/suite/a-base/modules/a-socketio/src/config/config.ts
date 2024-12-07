import { VonaApplication, IModuleConfigBroadcast, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  registerMessageClass: {
    bean: 'registerMessageClass',
  } as IModuleConfigQueue,
  process: {
    bean: 'process',
    concurrency: true,
  } as IModuleConfigQueue,
  delivery: {
    bean: 'delivery',
    concurrency: true,
  } as IModuleConfigQueue,
  push: {
    bean: 'push',
    concurrency: true,
  } as IModuleConfigQueue,
  pushDirect: {
    bean: 'pushDirect',
    concurrency: true,
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
