import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    message: {
      sync: {
        saveLimit: 200,
      },
    },
  };
};
