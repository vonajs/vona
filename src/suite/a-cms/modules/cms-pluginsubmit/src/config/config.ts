import { VonaApplication, IModuleConfigQueue } from 'vona';

// queues
const queues = {
  submit: {
    bean: 'submit',
  } as IModuleConfigQueue,
};

export const config = (_app: VonaApplication) => {
  return {
    queues,
    // plugin
    plugin: {
      submit: {
        baidu: {
          token: '',
        },
      },
    },
  };
};
