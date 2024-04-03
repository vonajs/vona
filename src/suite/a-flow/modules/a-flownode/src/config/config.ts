import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  startEventTimer: {
    bean: 'startEventTimer',
    concurrency: true,
  } as IModuleConfigQueue,
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
