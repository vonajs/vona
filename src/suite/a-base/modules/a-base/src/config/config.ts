import { CabloyApplication, IModuleConfigMiddleware, IModuleConfigQueue, IModuleConfigStartup } from 'vona';
import { IModuleConfigSummer } from 'vona-module-a-summer';

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
const startups: Record<string, IModuleConfigStartup> = {
  loadSchedules: {
    bean: 'loadSchedules',
    // instance: true,
    debounce: true,
    after: true,
  },
  loadAtomStatics: {
    bean: 'loadAtomStatics',
    instance: true,
    debounce: true,
  },
  checkResourceLocales: {
    bean: 'checkResourceLocales',
    instance: true,
    debounce: true,
  },
  checkViewHistoryRight: {
    bean: 'checkViewHistoryRight',
    instance: true,
    debounce: true,
  },
  outputHomeRoute: {
    bean: 'outputHomeRoute',
    debounce: true,
    after: true,
  },
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
const summer = {
  group: {
    default: {
      atomClassInner: {
        bean: 'atomClassInner',
        config: 'all',
      },
      roleScopesOfUser: {
        bean: 'roleScopesOfUser',
        config: 'all',
      },
      roleScopesOfRole: {
        bean: 'roleScopesOfRole',
        config: 'all',
      },
      roleScopesMineOfUser: {
        bean: 'roleScopesMineOfUser',
        config: 'all',
      },
      roleWhosOfAtomClassAction: {
        bean: 'roleWhosOfAtomClassAction',
        config: 'all',
      },
      roleParentsOfUser: {
        bean: 'roleParentsOfUser',
        config: 'all',
      },
    },
    model: {
      role: { config: 'all' },
      user: { config: 'all' },
      atomClass: { config: 'allWithIgnoreNull' },
      atomAction: { config: 'allWithIgnoreNull' },
      atom: { config: 'redis' },
      category: { config: 'all' },
      label: { config: 'all' },
    },
  },
} as IModuleConfigSummer;

export const config = (_app: CabloyApplication) => {
  return {
    middlewares,
    startups,
    queues,
    summer,
    host: '',
    protocol: '',
    pageSize: 20,
    locales: {
      'en-us': 'English',
      'zh-cn': 'Chinese',
    },
    timezones: {
      'en-us': -8,
      'zh-cn': 8,
    },
    draft: {
      sequence: true,
    },
    cors: {
      whiteList: 'http://localhost',
    },
    checkUserName: true,
    account: {
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
    },
    publicDir: '',
    comment: {
      trim: {
        limit: 100,
        wordBreak: false,
        preserveTags: false,
      },
    },
    httpLog: true,
    auth: {
      avatar: {
        timeout: 5000,
        default: 'https://cabloy.com/plugins/cms-pluginbase/assets/images/avatar_user.png',
      },
      maxAge: {
        anonymous: 365 * 24 * 3600 * 1000, // 365 days
        authenticated: 30 * 24 * 3600 * 1000, // 30 days // authenticated or rememberMe
        default: 1 * 24 * 3600 * 1000, // default is one day
      },
    },
    user: {
      privacyFields: 'createdAt,updatedAt,realName,locale,email,mobile,activated,emailConfirmed,mobileVerified',
    },
    securityLevelProtection: {
      body: {
        crypto: false,
        cryptojs: '/a/base/js/bodyCrypto',
      },
    },
    configFront: {
      site: {
        cover: '/api/static/a/base/img/cabloy.png',
      },
      demo: {
        enable: false,
      },
    },
  };
};
