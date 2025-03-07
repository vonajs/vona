import type { VonaApplication } from 'vona';
import type { ConfigJwt } from '../types/jwt.ts';

export function config(app: VonaApplication) {
  const config: ConfigJwt = {
    default: {
      secret: undefined,
      signOptions: {
        issuer: app.config.env.appName,
      },
    },
    scenes: {
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
  };
  return config;
}
