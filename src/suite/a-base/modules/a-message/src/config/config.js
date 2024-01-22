// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // socketio
  config.socketio = {
    message: {
      push: {
        channels: ['a-mail:mail'],
      },
      render: {
        templates: {
          'a-mail:mail': {
            subject: 'uniformMessageRenderTemplateMailSubject',
            body: 'uniformMessageRenderTemplateMailBody',
          },
        },
      },
    },
  };

  return config;
};
