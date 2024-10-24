import { VonaApplication, IModuleConfigMiddleware } from 'vona';

// middlewares
const middlewares = {
  validate: {
    bean: 'validate',
    global: false,
  } as IModuleConfigMiddleware,
};

export const config = (_app: VonaApplication) => {
  return {
    middlewares,
  };
};
