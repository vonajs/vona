import { IModuleConfigMiddleware, IModuleConfigQueue, IModuleConfigStartup } from '@cabloy/core';

// middlewares
const middlewares = {
  inner: {
    bean: 'inner',
    global: false,
  } as IModuleConfigMiddleware,
  test: {
    bean: 'test',
    global: false,
  } as IModuleConfigMiddleware,
  transaction: {
    bean: 'transaction',
    global: false,
  } as IModuleConfigMiddleware,
  gate: {
    bean: 'gate',
    global: true,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
  cors: {
    bean: 'cors',
    global: true,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
  authOpen: {
    bean: 'authOpen',
    global: true,
    dependencies: 'auth',
  } as IModuleConfigMiddleware,
  auth: {
    bean: 'auth',
    global: true,
    dependencies: 'instance',
    ignore: /\/version\/(update|init|test)/,
  } as IModuleConfigMiddleware,
  right: {
    bean: 'right',
    global: true,
    dependencies: 'auth,authOpen',
  } as IModuleConfigMiddleware,
  jsonp: {
    bean: 'jsonp',
    global: false,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
  httpLog: {
    bean: 'httpLog',
    global: false,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
  connectionAuth: {
    bean: 'connectionAuth',
    type: 'socketio.connection',
  } as IModuleConfigMiddleware,
};

// startups
const startups = {
  loadSchedules: {
    bean: 'loadSchedules',
    // instance: true,
    debounce: true,
    after: true,
  } as IModuleConfigStartup,
  loadAtomStatics: {
    bean: 'loadAtomStatics',
    instance: true,
    debounce: true,
  } as IModuleConfigStartup,
  checkResourceLocales: {
    bean: 'checkResourceLocales',
    instance: true,
    debounce: true,
  } as IModuleConfigStartup,
  checkViewHistoryRight: {
    bean: 'checkViewHistoryRight',
    instance: true,
    debounce: true,
  } as IModuleConfigStartup,
};

// queues
const queues = {
  schedule: {
    bean: 'schedule',
  } as IModuleConfigQueue,
  roleBuild: {
    bean: 'roleBuild',
  } as IModuleConfigQueue,
};

// summer
config.summer = {
  caches: {
    modelRole: {
      bean: null,
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    modelUser: {
      bean: null,
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    modelAtomClass: {
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
      ignoreNull: true,
    },
    modelAtomAction: {
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
      ignoreNull: true,
    },
    modelAtom: {
      mode: 'redis', // only redis
      // mem: {
      //   max: 500,
      // },
      redis: {
        ttl: 2 * 60 * 60 * 1000, // 2 hours
      },
    },
    modelCategory: {
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    modelLabel: {
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    atomClassInner: {
      bean: 'atomClassInner',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    roleScopesOfUser: {
      bean: 'roleScopesOfUser',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    roleScopesOfRole: {
      bean: 'roleScopesOfRole',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    roleScopesMineOfUser: {
      bean: 'roleScopesMineOfUser',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    roleWhosOfAtomClassAction: {
      bean: 'roleWhosOfAtomClassAction',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
    roleParentsOfUser: {
      bean: 'roleParentsOfUser',
      mode: 'all',
      mem: {
        max: 500,
      },
      redis: {
        ttl: 4 * 60 * 60 * 1000, // 4 hours
      },
    },
  },
};

module.exports = _app => {
  const config = {};

  // pageSize
  config.pageSize = 20;

  // locales
  config.locales = {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  };

  // timezones
  config.timezones = {
    'en-us': -8,
    'zh-cn': 8,
  };

  config.draft = {
    sequence: true,
  };

  config.cors = {
    whiteList: 'http://localhost',
  };

  // checkUserName
  config.checkUserName = true;
  // account
  config.account = {
    needActivation: true,
    activationWays: 'mobile,email',
    activationProviders: {
      mobile: 'a-authsms',
      email: 'a-authsimple',
    },
    url: {
      // url is specified by activation provider
      //   emailConfirm: '/a/authsimple/emailConfirm',
      //   mobileVerify: '',
      //   passwordChange: '/a/authsimple/passwordChange',
      //   passwordForgot: '/a/authsimple/passwordForgot',
      //   passwordReset: '/a/authsimple/passwordReset',
    },
    //  default is 'activated', if need activating by mobile/email, then add to 'registered' first
    activatedRoles: 'activated',
  };

  // public dir
  config.publicDir = '';

  // comment
  config.comment = {
    trim: {
      limit: 100,
      wordBreak: false,
      preserveTags: false,
    },
  };

  // httpLog
  config.httpLog = true;

  // auth
  config.auth = {
    avatar: {
      timeout: 5000,
      default: 'https://cabloy.com/plugins/cms-pluginbase/assets/images/avatar_user.png',
    },
    maxAge: {
      anonymous: 365 * 24 * 3600 * 1000, // 365 days
      authenticated: 30 * 24 * 3600 * 1000, // 30 days // authenticated or rememberMe
      default: 1 * 24 * 3600 * 1000, // default is one day
    },
  };

  // user
  config.user = {
    privacyFields: 'createdAt,updatedAt,realName,locale,email,mobile,activated,emailConfirmed,mobileVerified',
  };

  // securityLevelProtection
  config.securityLevelProtection = {
    body: {
      crypto: false,
      cryptojs: '/a/base/js/bodyCrypto',
    },
  };

  // configFront
  config.configFront = {
    site: {
      cover: '/api/static/a/base/img/cabloy.png',
    },
    demo: {
      enable: false,
    },
  };

  return config;
};
