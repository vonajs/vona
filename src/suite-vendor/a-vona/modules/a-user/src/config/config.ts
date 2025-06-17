import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';
import type { TypeAuthToken } from '../types/auth.ts';

export function config(_app: VonaApplication) {
  return {
    passport: {
      refreshAuthToken: 'recreate' as TypeAuthToken,
    },
    adapter: {
      authToken: 'home-user:authTokenAdapter' as keyof IServiceRecord,
      passport: 'home-user:passportAdapter' as keyof IServiceRecord,
      userInner: 'home-user:userInnerAdapter' as keyof IServiceRecord,
      authInner: 'home-user:authInnerAdapter' as keyof IServiceRecord,
      roleInner: 'home-user:roleInnerAdapter' as keyof IServiceRecord,
    },
  };
}
