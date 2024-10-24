// queues
const queues = {
  overtime: {
    bean: 'overtime',
  },
};

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    queues,
  };
};
