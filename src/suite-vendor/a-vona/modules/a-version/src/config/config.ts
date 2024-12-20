import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    worker: {
      alive: {
        timeout: 7000,
      },
    },
  };
};
