import { CabloyAppInfo, CabloyConfigOptional } from 'vona-core';

export default function (_appInfo: CabloyAppInfo) {
  const config = {} as CabloyConfigOptional;

  // proxy
  config.proxy = true;
  config.ipHeaders = 'x-real-ip,x-forwarded-for';

  // database
  config.database = {
    testDatabase: false,
    base: {
      asyncStackTraces: false,
    },
  };

  // mysql
  config.mysql = {
    default: {
      hook: {
        meta: {
          long_query_time: 500,
        },
      },
    },
  };

  return config;
}
