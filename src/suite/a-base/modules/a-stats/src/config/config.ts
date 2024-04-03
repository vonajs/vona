import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
