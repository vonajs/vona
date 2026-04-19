import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-bean';

import type { AuthTokenStrategy } from '../types/auth.ts';

export function config(_app: VonaApplication) {
  return {
    user: {
      autoActivate: false,
    },
    authToken: {
      strategy: {
        refreshAuthToken: 'refresh' as AuthTokenStrategy, // 'reissue': not support different clients
        signin: 'refresh' as AuthTokenStrategy,
      },
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
