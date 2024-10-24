import { VonaApplication, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

export const config = (_app: VonaApplication) => {
  return {
    queues,
  };
};
