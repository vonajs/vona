import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    timeout: {
      ping: 20000,
    },
  };
}
