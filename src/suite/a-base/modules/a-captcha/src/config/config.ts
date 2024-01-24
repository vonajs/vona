import { IModuleConfigMiddleware } from '@cabloy/core';

// middlewares
const middlewares = {
  captchaVerify: {
    bean: 'captchaVerify',
    global: false,
    dependencies: 'auth',
  } as IModuleConfigMiddleware,
};

export const config = _app => {
  return {
    middlewares,
    // captcha scenes
    captcha: {
      scenes: {
        default: {
          module: 'a-captchasimple',
          name: 'captcha',
          timeout: 20 * 60 * 1000,
        },
      },
    },
    // configFront
    configFront: {
      local: {
        disabled: false,
      },
    },
  };
};
