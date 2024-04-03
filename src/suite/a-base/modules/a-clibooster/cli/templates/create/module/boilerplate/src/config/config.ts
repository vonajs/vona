import { IModuleConfigBroadcast, IModuleConfigStartup } from '@cabloy/core';

const startups = {
  workerAlive: {
    bean: 'workerAlive',
  } as IModuleConfigStartup,
  databaseInit: {
    bean: 'databaseInit',
    debounce: true,
  } as IModuleConfigStartup,
  databaseName: {
    bean: 'databaseName',
  } as IModuleConfigStartup,
  instanceInit: {
    bean: 'instanceInit',
    instance: true,
    debounce: true,
  } as IModuleConfigStartup,
};

const broadcasts = {
  columnsClear: {
    bean: 'columnsClear',
    instance: false,
  } as IModuleConfigBroadcast,
};

export const config = _app => {
  return {
    startups,
    broadcasts,
    worker: {
      alive: {
        timeout: 7000,
      },
    },
  };
};
