import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

export const config = _app => {
  return {
    queues,
  };
};
