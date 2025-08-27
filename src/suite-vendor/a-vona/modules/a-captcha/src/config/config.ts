import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    captchaProvider: {
      ttl: 20 * 60 * 1000,
      ttlSecondary: 20 * 60 * 1000,
    },
  };
}
