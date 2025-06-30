import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-bean';

export function config(_app: VonaApplication) {
  return {
    adapter: {
      authInner: 'a-auth:authInnerAdapter' as keyof IServiceRecord,
    },
  };
}
