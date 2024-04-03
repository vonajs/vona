import { IModuleConfigQueue } from '@cabloy/core';

// queues
const queues = {
  submit: {
    bean: 'submit',
  } as IModuleConfigQueue,
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
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
