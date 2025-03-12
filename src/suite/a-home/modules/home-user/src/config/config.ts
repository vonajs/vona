import type { IBeanRecord, VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    adapter: {
      auth: 'auth' as keyof IBeanRecord,
    },
    redisToken: {
      maxAge: 30 * 24 * 60 * 60,
    },
  };
}
