import { CabloyApplication, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  stats: {
    bean: 'stats',
  } as IModuleConfigQueue,
};

export const config = (_app: CabloyApplication) => {
  return {
    queues,
  };
};
