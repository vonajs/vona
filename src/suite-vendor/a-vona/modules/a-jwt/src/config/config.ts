import type { VonaApplication } from 'vona';
import type { ConfigJwt } from '../types/jwt.ts';

export function config(app: VonaApplication) {
  return {
    field: {
      client: 'client',
    },
    default: {
      secret: undefined,
      signOptions: {
        issuer: app.config.env.appName,
      },
    },
    clients: {
      query: {
        signOptions: { expiresIn: 2 * 60 },
      },
      access: {
        signOptions: { expiresIn: 2 * 60 * 60 },
      },
      refresh: {
        signOptions: { expiresIn: 30 * 24 * 60 * 60 },
      },
    },
  } as ConfigJwt;
}
