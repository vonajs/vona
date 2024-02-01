import { IModuleConfigBroadcast } from '@cabloy/core';
import { IModuleConfigSummer } from './types.js';

// broadcasts
const broadcasts = {
  memDel: {
    bean: 'memDel',
  } as IModuleConfigBroadcast,
  memMultiDel: {
    bean: 'memMultiDel',
  } as IModuleConfigBroadcast,
  memClear: {
    bean: 'memClear',
  } as IModuleConfigBroadcast,
};

export const config = _app => {
  return {
    broadcasts,
    summer: {
      enable: true,
    },
  };
};
