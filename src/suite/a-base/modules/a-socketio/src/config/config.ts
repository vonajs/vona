import {
  IModuleConfigBroadcast,
  IModuleConfigMiddleware,
  IModuleConfigQueue,
  IModuleConfigSummer,
  IModuleConfigSummerCache,
} from '@cabloy/core';

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
  caches: {
    modelMessageClass: {
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
      ignoreNull: true,
    } as IModuleConfigSummerCache,
  },
} as IModuleConfigSummer;

export const config = _app => {
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
