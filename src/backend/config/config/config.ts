import type { VonaAppInfo, VonaConfigEnv, VonaConfigOptional } from 'vona';
import type { IDatabaseClientRecord } from 'vona-module-a-orm';

export default function (_appInfo: VonaAppInfo, env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // redis
  config.redis = {
    default: {
      host: env.REDIS_DEFAULT_HOST,
      port: Number.parseInt(env.REDIS_DEFAULT_PORT!),
      password: env.REDIS_DEFAULT_PASSWORD,
      db: Number.parseInt(env.REDIS_DEFAULT_DB!),
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    clients: {},
  };

  // database
  config.database = {
    testDatabase: false,
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
    defaultClient: env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(env.DATABASE_CLIENT_PG_PORT!),
          user: env.DATABASE_CLIENT_PG_USER,
          password: env.DATABASE_CLIENT_PG_PASSWORD,
          database: env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(env.DATABASE_CLIENT_MYSQL_PORT!),
          user: env.DATABASE_CLIENT_MYSQL_USER,
          password: env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
