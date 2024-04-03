import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
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
