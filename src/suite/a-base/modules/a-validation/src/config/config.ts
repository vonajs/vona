import { IModuleConfigMiddleware } from '@cabloy/core';

// middlewares
const middlewares = {
  validate: {
    bean: 'validate',
    global: false,
  } as IModuleConfigMiddleware,
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    middlewares,
  };
};
