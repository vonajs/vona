import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    progress: {
      expireTime: 2 * 3600 * 1000, // default is 2 hours
    },
  };
};
