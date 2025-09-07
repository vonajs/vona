import type { VonaApplication } from 'vona';
import type { ConfigMail } from '../types/config.ts';

export function config(_app: VonaApplication) {
  return {
    defaultClient: 'system',
    clients: {
      system: {
        transport: {},
        defaults: {
          from: 'admin@cabloy.com',
        },
      },
    },
  } as ConfigMail;
}
