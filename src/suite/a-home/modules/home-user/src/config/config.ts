import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';

export function config(_app: VonaApplication) {
  return {
    adapter: {
      auth: 'a-auth:auth' as keyof IServiceRecord,
    },
    redisToken: {
      maxAge: 30 * 24 * 60 * 60,
    },
  };
}
