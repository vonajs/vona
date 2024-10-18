import { CabloyAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: CabloyAppInfo) {
  const config = {} as VonaConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // modules
  config.modules = {
    'a-captcha': {
      configFront: {
        local: {
          // disabled: true,
        },
      },
    },
  };

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
          database: 'postgres', // recommended
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: '127.0.0.1',
          port: 3306,
          user: 'root',
          password: 'xxxxxx',
          database: 'mysql', // recommended
        },
      },
    },
  };

  return config;
}
