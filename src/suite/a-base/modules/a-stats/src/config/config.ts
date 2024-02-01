import { IModuleConfigQueue } from '@cabloy/core';
import { IModuleConfigSummer } from 'cabloy-module-api-a-summer';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

// summer
const summer = {
  group: {
    model: {
      stats: {
        config: 'redis',
      },
    },
  },
} as IModuleConfigSummer;

export const config = _app => {
  return {
    queues,
    summer,
  };
};
