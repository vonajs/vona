import { VonaApplication, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  startEventTimer: {
    bean: 'startEventTimer',
    concurrency: true,
  } as IModuleConfigQueue,
};

export const config = (_app: VonaApplication) => {
  return {
    queues,
  };
};
