module.exports = _appInfo => {
  const config = {} as any;

  // queue
  config.queue = {
    redlock: {
      options: {
        lockTTL: 60 * 1000,
      },
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
};
