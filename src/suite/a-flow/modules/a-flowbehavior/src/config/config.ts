// queues
const queues = {
  overtime: {
    bean: 'overtime',
  },
};

import { CabloyApplication } from 'vona';

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
