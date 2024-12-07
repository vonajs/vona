import { VonaApplication, IModuleConfigBroadcast } from 'vona';

const broadcasts = {
  columnsClear: {
    bean: 'columnsClear',
    instance: false,
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
    worker: {
      alive: {
        timeout: 7000,
      },
    },
  };
};
