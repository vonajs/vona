import { CabloyApplication, IModuleConfigMiddleware } from '@cabloy/core';

// middlewares
const middlewares = {
  validate: {
    bean: 'validate',
    global: false,
  } as IModuleConfigMiddleware,
};

export const config = (_app: CabloyApplication) => {
  return {
    middlewares,
  };
};
