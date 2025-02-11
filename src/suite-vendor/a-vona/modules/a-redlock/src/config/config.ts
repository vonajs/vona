import { VonaApplication } from 'vona';
import * as Redlock from 'redlock';
import { IRedisClientRecord } from 'vona-module-a-redis';

export const config = (app: VonaApplication) => {
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
      } as Redlock.Options,
    },
  };
};
