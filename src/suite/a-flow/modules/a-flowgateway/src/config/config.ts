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

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    queues,
  };
};
