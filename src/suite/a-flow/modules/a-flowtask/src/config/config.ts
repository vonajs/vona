// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // summer
  config.summer = {
    caches: {
      modelFlowTask: {
        mode: 'redis', // only redis
        redis: {
          ttl: 2 * 60 * 60 * 1000, // 2 hours
        },
      },
      modelFlowTaskHistory: {
        mode: 'redis', // only redis
        redis: {
          ttl: 2 * 60 * 60 * 1000, // 2 hours
        },
      },
    },
  };

  return config;
};
