// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // progress
  config.progress = {
    expireTime: 2 * 3600 * 1000, // default is 2 hours
  };

  return config;
};
