// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // queues
  config.queues = {
    gateway: {
      bean: 'gateway',
      options: {
        worker: {
          concurrency: 10,
        },
      },
    },
  };

  return config;
};
