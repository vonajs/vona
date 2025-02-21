import type { VonaAppInfo, VonaConfigOptional } from 'vona';
import * as uuid from 'uuid';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;
 

  // database
  config.database = {
    testDatabase: false,
    defaultClient: process.env.DATABASE_DEFAULT_CLIENT,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: process.env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(process.env.DATABASE_CLIENT_PG_PORT!),
          user: process.env.DATABASE_CLIENT_PG_USER,
          password: process.env.DATABASE_CLIENT_PG_PASSWORD,
          database: process.env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: process.env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(process.env.DATABASE_CLIENT_MYSQL_PORT!),
          user: process.env.DATABASE_CLIENT_MYSQL_USER,
          password: process.env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: process.env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
  };

  // redis
  config.redis = {
    default: {
      host: process.env.REDIS_DEFAULT_HOST,
      port: Number.parseInt(process.env.REDIS_DEFAULT_PORT!),
      password: process.env.REDIS_DEFAULT_PASSWORD,
      db: Number.parseInt(process.env.REDIS_DEFAULT_DB!),
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    clients: {
      default: { keyPrefix: `default_${appInfo.name}:` },
      redlock: {},
      queue: {},
      broadcast: {},
      cache: { keyPrefix: `cache_${appInfo.name}:` },
      io: { keyPrefix: `io_${appInfo.name}:` },
      auth: { keyPrefix: `auth_${appInfo.name}:` },
      summer: { keyPrefix: `summer_${appInfo.name}:` },
      model: { keyPrefix: `model_${appInfo.name}:` },
    },
  };

  return config;
}
