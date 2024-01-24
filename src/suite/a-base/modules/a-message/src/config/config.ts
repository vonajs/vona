export const config = _app => {
  return {
    socketio: {
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
    },
  };
};
