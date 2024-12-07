import { VonaApplication, IModuleConfigBroadcast } from 'vona';

const broadcasts = {
  resetCache: {
    bean: 'resetCache',
  } as IModuleConfigBroadcast,
  reload: {
    bean: 'reload',
  } as IModuleConfigBroadcast,
};

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
  };
};
