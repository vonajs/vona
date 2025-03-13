import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';

export function config(_app: VonaApplication) {
  return {
    passport: {
      refreshAuthToken: {
        recreate: true,
        refresh: true,
      },
    },
    adapter: {
      authToken: 'home-user:authTokenAdapter' as keyof IServiceRecord,
      passport: 'home-user:passportAdapter' as keyof IServiceRecord,
      userInner: 'home-user:userInnerAdapter' as keyof IServiceRecord,
      authInner: 'home-user:authInnerAdapter' as keyof IServiceRecord,
    },
  };
}
