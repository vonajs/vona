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
      user: 'home-user:userAdapter' as keyof IServiceRecord,
      role: 'home-user:roleAdapter' as keyof IServiceRecord,
    },
    payloadData: {
      fields: {
        authId: 'authId',
        userId: 'userId',
        token: 'token',
      },
    },
  };
}
