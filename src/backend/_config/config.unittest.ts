import { CabloyAppInfo, CabloyConfigOptional } from '@cabloy/core';

export default function (appInfo: CabloyAppInfo) {
  const config = {} as CabloyConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // modules
  config.modules = {};

  // redis
  config.redis = {
    default: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  // database
  config.database = {
    // defaultClient: 'mysql',
    defaultClient: 'default',
    clients: {
      default: {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          port: 5432,
          user: 'postgres',
          password: 'xxxxxx',
          database: 'postgres', // donnot change the name
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: '127.0.0.1',
          port: 3306, // for github actions
          user: 'root',
          password: 'xxxxxx',
          database: 'mysql', // donnot change the name
        },
      },
    },
  };

  return config;
}
