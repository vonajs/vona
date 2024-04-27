import { CabloyAppInfo, CabloyConfigOptional } from '@cabloy/core';

export default function (appInfo: CabloyAppInfo) {
  const config = {} as CabloyConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // instances
  config.instances = [
    {
      subdomain: '',
      password: '',
      title: '',
      config: {
        'a-base': {
          cors: { whiteList: 'http://localhost' },
        },
      },
    },
  ];

  // modules
  config.modules = {
    'a-base': {
      account: {
        // warning: if set true, should setup the provider's account of mail/sms
        needActivation: false,
      },
    },
  };

  // redis
  config.redis = {
    default: {
      host: 'redis', // see: docker-compose.yml
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
          host: 'pg', // see: docker-compose.yml
          port: 5432,
          user: 'xxxxxx',
          password: 'xxxxxx',
          database: 'xxxxxx',
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: 'mysql', // see: docker-compose.yml
          port: 3306,
          user: 'xxxxxx',
          password: 'xxxxxx',
          database: 'xxxxxx',
        },
      },
    },
  };

  return config;
}
