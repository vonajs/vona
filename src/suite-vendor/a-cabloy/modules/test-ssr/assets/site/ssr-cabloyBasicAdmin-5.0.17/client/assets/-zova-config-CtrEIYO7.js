import { c as combine, a as colorizer, f as formatLoggerFilter, t as timestamp, e as errors, s as splatter, b as formatLoggerConsole } from "./zova-QgocPMzS.js";
function config$1(sys) {
  const config2 = {};
  const env = sys.env;
  config2.routes = {
    path: {
      "/home/index": {
        alias: "/"
      },
      "/home/login": {
        alias: "/login"
      },
      "/demo/todo/todo": {
        alias: "/todo"
      }
    },
    name: {
      "demo-todo:item": {
        alias: "/todo/:id"
      }
    }
  };
  config2.app = {
    name: env.APP_NAME,
    title: env.APP_TITLE,
    description: env.APP_DESCRIPTION,
    version: env.APP_VERSION
  };
  config2.api = {
    baseURL: env.API_BASE_URL,
    prefix: env.API_PREFIX,
    jwt: env.API_JWT !== "false"
  };
  config2.ws = {
    baseURL: config2.api.baseURL?.replace("https://", "wss://").replace("http://", "ws://"),
    prefix: "/ws"
  };
  config2.locale = {
    default: env.APP_LOCALE_DEFAULT,
    cookieLocale: sys.env.SSR_COOKIE_LOCALE === "true",
    storeKey: "locale",
    items: {
      "en-us": "English",
      "zh-cn": "Chinese"
    }
  };
  config2.tz = {
    storeKey: "tz"
  };
  config2.layout = {
    app: {
      component: "a-app:app"
    },
    component: {
      empty: env.LAYOUT_COMPONENT_EMPTY,
      default: env.LAYOUT_COMPONENT_DEFAULT
    },
    sidebar: {
      leftOpenPC: env.LAYOUT_SIDEBAR_LEFTOPENPC === "true",
      breakpoint: 1023
    }
  };
  config2.logger = {
    base(clientInfo) {
      return {
        format: combine(splatter(), errors({
          stack: true
        }), timestamp(), formatLoggerFilter({
          level: clientInfo.level,
          silly: true
        }), colorizer(), formatLoggerConsole())
      };
    },
    clients: {
      default: {}
    }
  };
  config2.modules = {
    "a-style": {
      defaultTheme: env.STYLE_DEFAULT_THEME
    }
  };
  config2.onions = {};
  return config2;
}
function configMine(_sys) {
  const config2 = {
    layout: {
      component: {
        // default: 'home-layout:layoutDefault',
      }
    }
    // icon: {
    //   // defaultModule: 'home-icon',
    // },
  };
  config2.onions = {
    aop: {
      // 'demo-basic:home': { enable: false },
    },
    // interceptor: { 'a-interceptor:jwt': { match: '' } },
    theme: {
      "demo-basic:orange": {
        token: (_params) => {
          return {
            color: {
              // primary: 'red',
            }
          };
        }
      }
    },
    model: {
      // 'a-routertabs:tabs': {
      //   max: 10,
      // },
    }
  };
  config2.modules = {
    "a-style": {
      // defaultCss: 'home-base:default',
    },
    "home-layout": {
      tabs: {
        // cache: false,
      }
    }
  };
  return config2;
}
const config = [config$1, configMine];
export {
  config as c
};
