import { CabloyApplication, IModuleConfigBroadcast } from '@cabloy/core';

const middlewares = {
  // instance: {
  //   bean: 'instance',
  //   global: true,
  //   dependencies: 'appReady',
  // } as IModuleConfigMiddleware,
  // appReady: {
  //   bean: 'appReady',
  //   global: true,
  // } as IModuleConfigMiddleware,
};

const broadcasts = {
  resetCache: {
    bean: 'resetCache',
  } as IModuleConfigBroadcast,
  reload: {
    bean: 'reload',
  } as IModuleConfigBroadcast,
};

export const config = (_app: CabloyApplication) => {
  return {
    middlewares,
    broadcasts,
  };
};
