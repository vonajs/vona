import type { VonaApplication } from 'vona';
import type { ConfigJwt } from '../types/jwt.ts';

export function config(app: VonaApplication) {
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
      },
    },
    tempToken: {
      signOptions: { expiresIn: 10 * 60 },
    },
    default: {
      secret: undefined,
      signOptions: { issuer: app.config.env.appName },
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
      code: {
        signOptions: { expiresIn: 3 * 60 },
      },
    },
  } as ConfigJwt;
}
