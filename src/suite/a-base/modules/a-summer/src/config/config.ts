import { IModuleConfigBroadcast, IModuleConfigSummer } from '@cabloy/core';

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

// summer
const summer = {
  enable: true,
} as IModuleConfigSummer;

export const config = _app => {
  return {
    summer,
  };
};
