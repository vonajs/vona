import type { VonaApplication, VonaConfigEnv } from 'vona';
import type { ConfigJwt } from '../types/jwt.ts';

export function config(_app: VonaApplication, env: VonaConfigEnv) {
  return {
    field: {
      payload: {
        client: 'client',
        path: 'path',
        data: 'data',
      },
      extract: {
        header: '',
        headerAuth: 'authorization',
        headerAuthScheme: 'bearer',
        query: 'auth_token',
        cookie: 'token',
      },
    },
    tempAuthToken: {
      signOptions: { expiresIn: 10 * 60 },
    },
    base: {
      secret: undefined,
      signOptions: { issuer: env.APP_NAME },
      verifyOptions: { issuer: env.APP_NAME },
    },
    clients: {
      access: {
        signOptions: { expiresIn: 2 * 60 * 60 },
      },
      refresh: {
        signOptions: { expiresIn: 7 * 24 * 60 * 60 },
      },
      oauth: {
        signOptions: { expiresIn: 5 * 60 },
      },
      oauthstate: {
        signOptions: { expiresIn: 5 * 60 },
      },
      code: {
        signOptions: { expiresIn: 3 * 60 },
      },
    },
  } as ConfigJwt;
}
