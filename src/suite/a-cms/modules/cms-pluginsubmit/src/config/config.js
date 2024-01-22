// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // plugin
  config.plugin = {
    submit: {
      baidu: {
        token: '',
      },
    },
  };

  // queues
  config.queues = {
    submit: {
      bean: 'submit',
    },
  };

  return config;
};
