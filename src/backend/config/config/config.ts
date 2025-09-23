import type { VonaAppInfo, VonaConfigEnv, VonaConfigOptional } from 'vona';
import type { IDatabaseClientRecord } from 'vona-module-a-orm';

export default function (_appInfo: VonaAppInfo, env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // database
  config.database = {
    testDatabase: false,
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
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
