import { CabloyAppInfo, CabloyConfigOptional } from 'vona-core';

export default function (_appInfo: CabloyAppInfo) {
  const config = {} as CabloyConfigOptional;

  // proxy
  config.proxy = true;
  config.ipHeaders = 'x-real-ip,x-forwarded-for';

  // queue
  config.queue = {
    redlock: {
      options: {
        lockTTL: 8 * 1000,
      },
    },
  };

  // database
  config.database = {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
  };

  // mysql
  config.mysql = {
    default: {
      connectionLimit: 1,
      connectionLimitInner: 1,
      hook: {
        meta: {
          long_query_time: 0,
        },
      },
    },
  };

  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: process.env.http_proxy,
      },
    };
  }

  return config;
}
