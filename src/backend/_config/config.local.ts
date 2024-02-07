import { CabloyAppInfo, CabloyConfigOptional } from '@cabloy/core';

module.exports = (appInfo: CabloyAppInfo) => {
  const config = {} as CabloyConfigOptional;

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

  // mysql
  config.mysql = {
    default: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'mysql', // recommended
      charset: 'utf8mb4_general_ci',
      hook: {
        meta: {
          long_query_time: 200,
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

  return config;
};
