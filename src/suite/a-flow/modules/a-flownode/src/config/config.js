// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // queues
  config.queues = {
    startEventTimer: {
      bean: 'startEventTimer',
      concurrency: true,
    },
  };

  return config;
};
