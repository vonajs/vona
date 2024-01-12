// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // queues
  config.queues = {
    overtime: {
      bean: 'overtime',
    },
  };

  return config;
};
