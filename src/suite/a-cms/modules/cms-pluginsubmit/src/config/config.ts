import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  submit: {
    bean: 'submit',
  } as IModuleConfigQueue,
};

export const config = _app => {
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
