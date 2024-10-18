import { CabloyApplication, IModuleConfigMiddleware } from 'vona';

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
