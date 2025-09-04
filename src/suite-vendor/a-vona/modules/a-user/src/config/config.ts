import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-bean';
import type { TypeAuthToken } from '../types/auth.ts';

export function config(_app: VonaApplication) {
  return {
    user: {
      autoActivate: false,
    },
    passport: {
      refreshAuthToken: 'recreate' as TypeAuthToken,
    },
    adapter: {
      authToken: 'a-user:authTokenAdapter' as keyof IServiceRecord,
      passport: 'home-user:passportAdapter' as keyof IServiceRecord,
      userInner: 'home-user:userInnerAdapter' as keyof IServiceRecord,
      authInner: 'home-user:authInnerAdapter' as keyof IServiceRecord,
      roleInner: 'home-user:roleInnerAdapter' as keyof IServiceRecord,
    },
    payloadData: {
      fields: {
        authId: 'authId',
        userId: 'userId',
        token: 'token',
      },
    },
    redisToken: {
      maxAge: 30 * 24 * 60 * 60,
    },
  };
}
