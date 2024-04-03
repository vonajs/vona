// queues
const queues = {
  gateway: {
    bean: 'gateway',
    options: {
      worker: {
        concurrency: 10,
      },
    },
  },
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
