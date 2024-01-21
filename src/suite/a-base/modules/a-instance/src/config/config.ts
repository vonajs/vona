import { IModuleConfigBroadcast } from '@cabloy/core';

export const config = _app => {
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

  return {
    middlewares,
    broadcasts,
  };
};
