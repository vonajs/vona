// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // middlewares
  config.middlewares = {};

  // progress
  config.progress = {
    expireTime: 2 * 3600 * 1000, // default is 2 hours
  };

  return config;
};
