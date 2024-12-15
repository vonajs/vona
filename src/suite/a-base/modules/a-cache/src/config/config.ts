import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    // db
    db: {
      redis: true,
    },
  };
};
