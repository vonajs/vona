// queues
const queues = {
  overtime: {
    bean: 'overtime',
  },
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
