import type { VonaAppInfo, VonaConfigEnv, VonaConfigOptional } from 'vona';
import type { IDatabaseClientRecord } from 'vona-module-a-orm';

declare module 'vona' {
  export interface IInstanceRecord {
    singleTest: never;
    isolateTest: never;
  }
}

declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    isolateTest: never;
  }
}

export default function (_appInfo: VonaAppInfo, env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // instances
  config.instances = [
    { name: '', password: '', title: '' },
    { name: 'singleTest', password: '', title: '' },
    { name: 'isolateTest', password: '', title: '', id: 1000, isolate: true, isolateClient: 'isolateTest' },
  ];

  // redis
  config.redis = {
    clients: {},
  };

  // database
  config.database = {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
    clients: {},
  };

  // Multi-Instance/Multi-Tenancy
  const databaseDefaultClient = env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord;
  config.database.clients!.isolateTest =
    databaseDefaultClient === 'pg'
      ? {
          client: 'pg',
          connection: {
            host: env.DATABASE_CLIENT_PG_HOST,
            port: Number.parseInt(env.DATABASE_CLIENT_PG_PORT!),
            user: env.DATABASE_CLIENT_PG_USER,
            password: env.DATABASE_CLIENT_PG_PASSWORD,
            database: env.DATABASE_CLIENT_PG_DATABASE,
          },
        }
      : databaseDefaultClient === 'mysql'
        ? {
            client: 'mysql2',
            connection: {
              host: env.DATABASE_CLIENT_MYSQL_HOST,
              port: Number.parseInt(env.DATABASE_CLIENT_MYSQL_PORT!),
              user: env.DATABASE_CLIENT_MYSQL_USER,
              password: env.DATABASE_CLIENT_MYSQL_PASSWORD,
              database: env.DATABASE_CLIENT_MYSQL_DATABASE,
            },
          }
        : undefined;

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
