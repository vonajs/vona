import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    redisToken: {
      maxAge: 30 * 24 * 60 * 60,
    },
  };
}
