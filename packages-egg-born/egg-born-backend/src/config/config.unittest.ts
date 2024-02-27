import { CabloyAppInfo, CabloyConfigOptional } from '@cabloy/core';

export default function (_appInfo: CabloyAppInfo) {
  const config = {} as CabloyConfigOptional;

  // queue
  config.queue = {
    redlock: {
      options: {
        lockTTL: 60 * 1000,
      },
    },
  };

  // database
  config.database = {
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
          long_query_time: 200,
        },
      },
    },
  };

  return config;
}
