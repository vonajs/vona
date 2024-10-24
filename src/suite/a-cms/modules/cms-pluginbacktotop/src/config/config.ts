import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    plugin: {
      animateSpeed: 500,
    },
  };
};
