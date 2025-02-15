import type { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    startup: {
      debounce: 10 * 1000,
    },
  };
};
