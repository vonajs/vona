import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    userOnline: {
      expired: 20 * 60 * 1000, // 20 minutes
    },
  };
};
