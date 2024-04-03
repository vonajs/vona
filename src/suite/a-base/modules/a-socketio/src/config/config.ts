import { CabloyApplication, IModuleConfigBroadcast, IModuleConfigMiddleware, IModuleConfigQueue } from '@cabloy/core';
import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// middlewares
const middlewares = {
  connection: {
    bean: 'connection',
    type: 'socketio.connection',
    dependencies: 'connectionAuth',
  } as IModuleConfigMiddleware,
  packet: {
    bean: 'packet',
    type: 'socketio.packet',
  } as IModuleConfigMiddleware,
};

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

// summer
const summer = {
  group: {
    model: {
      messageClass: {
        config: 'allWithIgnoreNull',
      },
    },
  },
} as IModuleConfigSummer;

export const config = (_app: CabloyApplication) => {
  return {
    middlewares,
    queues,
    broadcasts,
    summer,
    message: {
      sync: {
        saveLimit: 200,
      },
    },
  };
};
