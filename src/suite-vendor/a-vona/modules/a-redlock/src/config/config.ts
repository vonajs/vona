import type * as Redlock from '@sesamecare-oss/redlock';
import type { VonaApplication } from 'vona';
import type { IRedisClientRecord } from 'vona-module-a-redis';

export function config(app: VonaApplication) {
  const lockTTL = app.meta.isLocal ? 8 : app.meta.isTest ? 60 : 30;
  return {
    redlock: {
      clients: ['redlock'] as (keyof IRedisClientRecord)[],
      lockTTL: lockTTL * 1000,
      // https://github.com/mike-marcacci/node-redlock#configuration
      options: {
        driftFactor: 0.01,
        retryCount: -1,
        retryDelay: 200,
        retryJitter: 100,
      } as Redlock.Settings,
    },
  };
}
