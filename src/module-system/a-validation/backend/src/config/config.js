// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // middlewares
  config.middlewares = {
    validate: {
      bean: 'validate',
      global: false,
    },
  };

  return config;
};
