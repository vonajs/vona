import { VonaApplication, IModuleConfigBroadcast, IModuleConfigMiddleware, IModuleConfigSchedule } from 'vona';

// broadcasts
const broadcasts = {
  broadcastTest: {
    bean: 'test',
  } as IModuleConfigBroadcast,
};

const middlewares = {
  testInterception: {
    bean: 'testInterception',
    global: false,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
  testRestructuring: {
    bean: 'testRestructuring',
    global: false,
    dependencies: 'instance',
  } as IModuleConfigMiddleware,
};

// schedules
const schedules = {
  test: {
    bean: 'test',
    repeat: {
      every: 3000,
    },
    disable: true,
  } as IModuleConfigSchedule,
};

const settings = {
  instance: {
    groupInfo: {
      slogan: '',
    },
  },
  user: {
    groupInfo: {
      username: 'zhennann',
    },
    groupExtra: {
      panelExtra: {
        groupInfo: {
          mobile: '123',
          sex: 1,
          language: 'en-us',
        },
      },
    },
  },
};

const cmsSitesParty = {
  base: {
    title: 'Party',
    subTitle: 'Test',
    description: '',
    keywords: '',
  },
  host: {
    url: 'http://example.com',
    rootPath: '',
  },
  language: false,
  themes: {
    default: 'test-party',
  },
  edit: {
    mode: 0, // custom
  },
  env: {
    format: {
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss',
    },
    article2: {
      recentNum: 5,
    },
    comment: {
      order: 'asc',
      recentNum: 5,
    },
    brother: {
      order: 'desc',
    },
    loadMore: {
      loadOnScroll: false,
    },
  },
};

const _captchaSMS = {
  module: 'a-authsms',
  name: 'captcha',
};

export const config = (app: VonaApplication) => {
  return {
    // app.meta.isTest
    broadcasts: app.meta.isTest ? broadcasts : undefined,
    monkeyed: app.meta.isTest ? false : undefined,
    // normal
    middlewares,
    schedules,
    message: 'Hello World',
    captcha: {
      scenes: {
        formMobileVerifyTest: _captchaSMS,
        formCaptchaTest: null, // means using default
        // formCaptchaTest: {
        //   module: 'a-captchasimple',
        //   name: 'captcha',
        // },
      },
    },
    settings,
    cms: {
      sites: {
        party: cmsSitesParty,
      },
    },
  };
};
