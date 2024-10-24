import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
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
