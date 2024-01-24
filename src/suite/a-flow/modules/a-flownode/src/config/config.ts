import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  startEventTimer: {
    bean: 'startEventTimer',
    concurrency: true,
  } as IModuleConfigQueue,
};

export const config = _app => {
  return {
    queues,
  };
};
