const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/counter-CqyYpxCD.js","assets/demo-basic-BBRtFFEQ.js","assets/zova-QgocPMzS.js","assets/vue-CRNsYCTs.js","assets/commonjsHelper-CCIqAdii.js","assets/zod-DcU_E_GK.js","assets/a-model-DdQjWvuo.js","assets/a-bean-Bxu0OKjI.js","assets/tanstack-query-D5lEwADt.js","assets/localforage-DLcenR3h.js","assets/a-pinia-BGHj6dhI.js","assets/pinia-BolmCbMV.js","assets/a-behavior-BVEM_kq-.js","assets/a-logger-CYjH9aBA.js","assets/a-style-uiQyot3t.js","assets/typestyle-BzUluVB3.js","assets/a-form-ae5PgLrA.js","assets/tanstack-form-c5sVeo1k.js","assets/a-openapi-m8k_rTIU.js","assets/openapi3-CmG_8H3_.js","assets/vue-router-DwxCgNw3.js","assets/a-table-CQXUiX08.js","assets/tanstack-table-JfOO9tPD.js","assets/a-fetch-Df1cb9Db.js","assets/axios-hebYYykT.js","assets/a-api-DhA-gIeb.js","assets/a-app-C_bKJa03.js","assets/a-boundary-Cuuuv-Ri.js","assets/a-currency-C8EefX2_.js","assets/a-date-CV7yGKNc.js","assets/a-icon-BvN4DnAK.js","assets/a-interceptor-DcETYv6G.js","assets/a-meta-BC4YoIBL.js","assets/a-ssr-DGqvHvmt.js","assets/a-router-CjBFMDNv.js","assets/a-ssrhmr-DBgtuHcw.js","assets/a-zod-CU11VfT2.js","assets/a-zova-Lk9_Hy2v.js","assets/a-b-CdKbo79o.js","assets/demo-todo-D-U9Yo-I.js","assets/home-api-BsWdi2ni.js","assets/home-base-D7OYPGUO.js","assets/home-icon-B4SLHu9R.js","assets/home-index-znKZEwvf.js","assets/home-layout-W4uQDT6x.js","assets/home-login-Dxs1ZrtI.js","assets/home-passport-Bh_n0O8K.js","assets/devui-adapter-2igqXY4b.js","assets/basic-adapter-BjVFxxKR.js","assets/basic-date-CSTs_cGU.js","assets/basic-form-CqEhVmJ7.js","assets/basic-restpage-DgTVfDPt.js","assets/basic-table-ConTOqDj.js","assets/rest-actions-P9s_ZAuL.js","assets/a-action-8vTCicfl.js","assets/rest-resource-DMRZUtYT.js","assets/a-actions-BsQyPCoV.js","assets/a-behaviors-Cpx3DPPu.js","assets/a-routerstack-C7iMbKSv.js","assets/a-routertabs-Bw2Awcsu.js","assets/zova-CV-Wh6Z0.js","assets/-zova-config-CtrEIYO7.js"])))=>i.map(i=>d[i]);
import { P as createVNode, g as getCurrentInstance, ac as createSSRApp } from "./vue-CRNsYCTs.js";
import { an as defineBoot, Z as BeanControllerPageBase, ao as PluginZova, ae as createZovaComponentPage } from "./zova-QgocPMzS.js";
import { c as config } from "./-zova-config-CtrEIYO7.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
const scriptRel = /* @__PURE__ */ (function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
})();
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const mainFn = defineBoot(({
  app: _app,
  ssrContext: _ssrContext
}) => {
});
const en_us = {
  modules: {}
};
const zh_cn = {
  modules: {}
};
const locales = {
  "en-us": en_us,
  "zh-cn": zh_cn
};
const routes = [{
  path: "/legacy/counter",
  component: () => __vitePreload(() => import("./counter-CqyYpxCD.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]) : void 0)
}];
const envNormal = {
  "NODE_ENV": "production",
  "BUILD_COPY_RELEASE": "/Volumes/my-data/cabloy/vona/src/suite/cabloy-basic/modules/basic-siteadmin/assets/site,/Volumes/my-data/cabloy/vona/src/suite-vendor/a-cabloy/modules/test-ssr/assets/site",
  "BUILD_REST_COPY_DIST": "/Volumes/my-data/cabloy/vona/src/suite/cabloy-basic/modules/basic-siteadmin/zovaRest,/Volumes/my-data/cabloy/vona/src/suite-vendor/a-cabloy/modules/test-ssr/zovaRest",
  "BUILD_SOURCEMAP": "false",
  "BUILD_MINIFY": "false",
  "PROJECT_DISABLED_MODULES": "",
  "MOCK_BUILD": "true",
  "API_BASE_URL": "",
  "SSR_API_BASE_URL": "",
  "SSR_HMR": "false",
  "MOCK_ENABLED": "false",
  "SSR_COOKIE_LOCALE": "true",
  "SSR_COOKIE_THEME": "true",
  "SSR_BODYREADYOBSERVER": "false",
  "APP_NAME": "Zova",
  "APP_TITLE": "Zova",
  "APP_DESCRIPTION": "A vue3 framework with ioc",
  "APP_VERSION": "5.0.17",
  "APP_META_VIEWPORT": "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width",
  "APP_PUBLIC_PATH": "",
  "APP_LOCALE_DEFAULT": "en-us",
  "APP_LOCALE_HEADER_KEY": "x-vona-locale",
  "APP_TZ_HEADER_KEY": "x-vona-tz",
  "ROUTER_MODE": "history",
  "ROUTER_PAGE_HOME": "/",
  "ROUTER_PAGE_LOGIN": "/login",
  "ROUTER_KEY_RETURNTO": "returnTo",
  "DEV_SERVER_HOSTNAME": "",
  "DEV_SERVER_PORT": "9000",
  "PROJECT_DISABLED_SUITES": "",
  "LAYOUT_COMPONENT_EMPTY": "home-layout:layoutEmpty",
  "LAYOUT_COMPONENT_DEFAULT": "home-layout:layoutTabs",
  "LAYOUT_SIDEBAR_LEFTOPENPC": "true",
  "STYLE_DEFAULT_THEME": "home-base:default",
  "LOGGER_CLIENT_DEFAULT": "",
  "BUILD_OUTDIR": "",
  "BUILD_ANALYZE": "false",
  "BUILD_COPY_DIST": "",
  "API_PREFIX": "/api",
  "API_JWT": "true",
  "OPENAPI_BASE_URL_DEFAULT": "",
  "PINIA_ENABLED": "true",
  "PROXY_API_ENABLED": "true",
  "PROXY_API_BASE_URL": "http://localhost:8888",
  "PROXY_API_PREFIX": "/api",
  "SSR_COOKIE_THEMEDARK_DEFAULT": "true",
  "SSR_PROD_PORT": "3000",
  "SSR_PROD_PROTOCOL": "http",
  "SSR_PROD_HOST": "localhost:3000",
  "MOCK_LOGGER": "false",
  "MOCK_BASE_NAME": "/api",
  "MOCK_BUILD_PORT": "8888",
  "MOCK_BUILD_OUTPUT": "dist-mock",
  "MOCK_BUILD_CORS": "true",
  "META_FLAVOR": "cabloyBasicAdmin",
  "META_MODE": "production",
  "META_APP_MODE": "ssr",
  "DEV": false,
  "PROD": true,
  "SSR": true
};
const env = envNormal;
const modules = {};
modules["a-fetch"] = {
  resource: () => __vitePreload(() => import("./a-fetch-Df1cb9Db.js"), true ? __vite__mapDeps([23,2,3,4,5,24,7]) : void 0),
  info: {
    "pid": "a",
    "name": "fetch",
    "relativeName": "a-fetch",
    "url": "a/fetch",
    "originalName": "a-fetch",
    "fullName": "zova-module-a-fetch",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "interceptor": {
          "optionsPackage": true,
          "optionsGlobalInterfaceName": "IDecoratorInterceptorOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-fetch",
          "boilerplate": "cli/interceptor/boilerplate"
        }
      }
    }
  }
};
modules["a-model"] = {
  resource: () => __vitePreload(() => import("./a-model-DdQjWvuo.js"), true ? __vite__mapDeps([6,2,3,4,5,7,8,9]) : void 0),
  info: {
    "pid": "a",
    "name": "model",
    "relativeName": "a-model",
    "url": "a/model",
    "originalName": "a-model",
    "fullName": "zova-module-a-model",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "model": {
          "sceneIsolate": true,
          "beanGeneral": true,
          "optionsGlobalInterfaceName": "IDecoratorModelOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-model",
          "boilerplate": "cli/model/boilerplate"
        }
      }
    }
  }
};
modules["a-openapi"] = {
  resource: () => __vitePreload(() => import("./a-openapi-m8k_rTIU.js").then((n) => n.c), true ? __vite__mapDeps([18,2,3,4,5,15,19,6,7,8,9]) : void 0),
  info: {
    "pid": "a",
    "name": "openapi",
    "relativeName": "a-openapi",
    "url": "a/openapi",
    "originalName": "a-openapi",
    "fullName": "zova-module-a-openapi",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-api"] = {
  resource: () => __vitePreload(() => import("./a-api-DhA-gIeb.js"), true ? __vite__mapDeps([25,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "api",
    "relativeName": "a-api",
    "url": "a/api",
    "originalName": "a-api",
    "fullName": "zova-module-a-api",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "api": {
          "sceneIsolate": true,
          "scopeResource": true,
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/api/boilerplate",
          "metadataCustom": "cli/api/metadata/generate.ts"
        },
        "apiMeta": {
          "sceneIsolate": true,
          "scopeResource": true,
          "beanGeneral": true,
          "optionsNone": true
        },
        "apiSchema": {
          "sceneIsolate": true,
          "scopeResource": true,
          "beanGeneral": true,
          "optionsNone": true
        }
      }
    }
  }
};
modules["a-app"] = {
  resource: () => __vitePreload(() => import("./a-app-C_bKJa03.js"), true ? __vite__mapDeps([26,2,3,4,5,20,7]) : void 0),
  info: {
    "pid": "a",
    "name": "app",
    "relativeName": "a-app",
    "url": "a/app",
    "originalName": "a-app",
    "fullName": "zova-module-a-app",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-bean"] = {
  resource: () => __vitePreload(() => import("./a-bean-Bxu0OKjI.js"), true ? __vite__mapDeps([7,2,3,4,5]) : void 0),
  info: {
    "pid": "a",
    "name": "bean",
    "relativeName": "a-bean",
    "url": "a/bean",
    "originalName": "a-bean",
    "fullName": "zova-module-a-bean",
    "vendor": true,
    "capabilities": {
      "preload": true,
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "sys": {
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/sys/boilerplate"
        },
        "bean": {
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/bean/boilerplate"
        },
        "data": {
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/data/boilerplate"
        },
        "service": {
          "sceneIsolate": true,
          "beanGeneral": true,
          "optionsNone": false,
          "optionsGlobalInterfaceFrom": "zova-module-a-bean",
          "boilerplate": "cli/service/boilerplate"
        },
        "store": {
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/store/boilerplate"
        },
        "tool": {
          "beanGeneral": true,
          "optionsNone": true,
          "boilerplate": "cli/tool/boilerplate"
        },
        "controller": {
          "beanGeneral": false,
          "optionsNone": true,
          "metadataCustom": "cli/controller/metadata/generate.ts"
        },
        "render": {
          "beanGeneral": false,
          "optionsNone": true
        },
        "style": {
          "beanGeneral": false,
          "optionsNone": true
        },
        "aop": {
          "optionsPackage": true,
          "optionsGlobalInterfaceName": "IDecoratorAopOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-bean",
          "boilerplate": "cli/aop/boilerplate"
        },
        "aopMethod": {
          "optionsGlobalInterfaceName": "IDecoratorAopMethodOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-bean",
          "boilerplate": "cli/aopMethod/boilerplate"
        }
      }
    }
  }
};
modules["a-behavior"] = {
  resource: () => __vitePreload(() => import("./a-behavior-BVEM_kq-.js"), true ? __vite__mapDeps([12,2,3,4,5,7,13]) : void 0),
  info: {
    "pid": "a",
    "name": "behavior",
    "relativeName": "a-behavior",
    "url": "a/behavior",
    "originalName": "a-behavior",
    "fullName": "zova-module-a-behavior",
    "vendor": true,
    "onionsMeta": {
      "onions": {
        "behavior": {
          "optionsGlobalInterfaceName": "IDecoratorBehaviorOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-behavior",
          "boilerplate": "cli/behavior/boilerplate",
          "metadataCustom": "cli/behavior/metadata/generate.ts"
        }
      }
    }
  }
};
modules["a-boundary"] = {
  resource: () => __vitePreload(() => import("./a-boundary-Cuuuv-Ri.js"), true ? __vite__mapDeps([27,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "boundary",
    "relativeName": "a-boundary",
    "url": "a/boundary",
    "originalName": "a-boundary",
    "fullName": "zova-module-a-boundary",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-currency"] = {
  resource: () => __vitePreload(() => import("./a-currency-C8EefX2_.js"), true ? __vite__mapDeps([28,2,3,4,5,7,21,18,15,19,6,8,9,22]) : void 0),
  info: {
    "pid": "a",
    "name": "currency",
    "relativeName": "a-currency",
    "url": "a/currency",
    "originalName": "a-currency",
    "fullName": "zova-module-a-currency",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-date"] = {
  resource: () => __vitePreload(() => import("./a-date-CV7yGKNc.js"), true ? __vite__mapDeps([29,2,3,4,5,21,18,15,19,6,7,8,9,22]) : void 0),
  info: {
    "pid": "a",
    "name": "date",
    "relativeName": "a-date",
    "url": "a/date",
    "originalName": "a-date",
    "fullName": "zova-module-a-date",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-form"] = {
  resource: () => __vitePreload(() => import("./a-form-ae5PgLrA.js"), true ? __vite__mapDeps([16,2,3,4,5,17,18,15,19,6,7,8,9]) : void 0),
  info: {
    "pid": "a",
    "name": "form",
    "relativeName": "a-form",
    "url": "a/form",
    "originalName": "a-form",
    "fullName": "zova-module-a-form",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-icon"] = {
  resource: () => __vitePreload(() => import("./a-icon-BvN4DnAK.js"), true ? __vite__mapDeps([30,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "icon",
    "relativeName": "a-icon",
    "url": "a/icon",
    "originalName": "a-icon",
    "fullName": "zova-module-a-icon",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-interceptor"] = {
  resource: () => __vitePreload(() => import("./a-interceptor-DcETYv6G.js"), true ? __vite__mapDeps([31,2,3,4,5,23,24,7]) : void 0),
  info: {
    "pid": "a",
    "name": "interceptor",
    "relativeName": "a-interceptor",
    "url": "a/interceptor",
    "originalName": "a-interceptor",
    "fullName": "zova-module-a-interceptor",
    "vendor": true,
    "onionsMeta": {
      "onionsConfig": {
        "interceptor": {
          "body": {
            "dependencies": "a-interceptor:performAction"
          },
          "headers": {
            "dependencies": "a-interceptor:mock"
          },
          "jwt": {
            "dependencies": "a-interceptor:headers"
          },
          "mock": {},
          "performAction": {
            "dependencies": "a-interceptor:jwt"
          }
        }
      }
    }
  }
};
modules["a-logger"] = {
  resource: () => __vitePreload(() => import("./a-logger-CYjH9aBA.js"), true ? __vite__mapDeps([13,7,2,3,4,5]) : void 0),
  info: {
    "pid": "a",
    "name": "logger",
    "relativeName": "a-logger",
    "url": "a/logger",
    "originalName": "a-logger",
    "fullName": "zova-module-a-logger",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-meta"] = {
  resource: () => __vitePreload(() => import("./a-meta-BC4YoIBL.js"), true ? __vite__mapDeps([32,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "meta",
    "relativeName": "a-meta",
    "url": "a/meta",
    "originalName": "a-meta",
    "fullName": "zova-module-a-meta",
    "vendor": true,
    "onionsMeta": {
      "onions": {
        "meta": {
          "optionsGlobalInterfaceFrom": "zova-module-a-meta"
        }
      }
    }
  }
};
modules["a-ssr"] = {
  resource: () => __vitePreload(() => import("./a-ssr-DGqvHvmt.js"), true ? __vite__mapDeps([33,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "ssr",
    "relativeName": "a-ssr",
    "url": "a/ssr",
    "originalName": "a-ssr",
    "fullName": "zova-module-a-ssr",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-router"] = {
  resource: () => __vitePreload(() => import("./a-router-CjBFMDNv.js"), true ? __vite__mapDeps([34,2,3,4,5,6,7,8,9,20]) : void 0),
  info: {
    "pid": "a",
    "name": "router",
    "relativeName": "a-router",
    "url": "a/router",
    "originalName": "a-router",
    "fullName": "zova-module-a-router",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-ssrhmr"] = {
  resource: () => __vitePreload(() => import("./a-ssrhmr-DBgtuHcw.js"), true ? __vite__mapDeps([35,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "ssrhmr",
    "relativeName": "a-ssrhmr",
    "url": "a/ssrhmr",
    "originalName": "a-ssrhmr",
    "fullName": "zova-module-a-ssrhmr",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-style"] = {
  resource: () => __vitePreload(() => import("./a-style-uiQyot3t.js"), true ? __vite__mapDeps([14,2,3,4,5,7,6,8,9,15]) : void 0),
  info: {
    "pid": "a",
    "name": "style",
    "relativeName": "a-style",
    "url": "a/style",
    "originalName": "a-style",
    "fullName": "zova-module-a-style",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "css": {
          "optionsGlobalInterfaceName": "IDecoratorCssOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-style",
          "boilerplate": "cli/css/boilerplate"
        },
        "theme": {
          "optionsGlobalInterfaceName": "IDecoratorThemeOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-style",
          "boilerplate": "cli/theme/boilerplate"
        }
      },
      "metas": {
        "themeHandler": {
          "boilerplate": "cli/themeHandler/boilerplate"
        }
      }
    }
  }
};
modules["a-table"] = {
  resource: () => __vitePreload(() => import("./a-table-CQXUiX08.js"), true ? __vite__mapDeps([21,2,3,4,5,18,15,19,6,7,8,9,22]) : void 0),
  info: {
    "pid": "a",
    "name": "table",
    "relativeName": "a-table",
    "url": "a/table",
    "originalName": "a-table",
    "fullName": "zova-module-a-table",
    "vendor": true,
    "onionsMeta": {
      "onions": {
        "tableCell": {
          "beanGeneral": true,
          "optionsGlobalInterfaceName": "IDecoratorTableCellOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-table",
          "boilerplate": "cli/tableCell/boilerplate",
          "metadataCustom": "cli/tableCell/metadata/generate.ts"
        }
      }
    }
  }
};
modules["a-zod"] = {
  resource: () => __vitePreload(() => import("./a-zod-CU11VfT2.js"), true ? __vite__mapDeps([36,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "zod",
    "relativeName": "a-zod",
    "url": "a/zod",
    "originalName": "a-zod",
    "fullName": "zova-module-a-zod",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-zova"] = {
  resource: () => __vitePreload(() => import("./a-zova-Lk9_Hy2v.js"), true ? __vite__mapDeps([37,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "zova",
    "relativeName": "a-zova",
    "url": "a/zova",
    "originalName": "a-zova",
    "fullName": "zova-module-a-zova",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-b"] = {
  resource: () => __vitePreload(() => import("./a-b-CdKbo79o.js"), true ? __vite__mapDeps([38,2,3,4,5,25,7,17]) : void 0),
  info: {
    "pid": "a",
    "name": "b",
    "relativeName": "a-b",
    "url": "a/b",
    "originalName": "a-b",
    "fullName": "zova-module-a-b",
    "vendor": false,
    "capabilities": {},
    "onionsMeta": {
      "onionsConfig": {}
    }
  }
};
modules["demo-basic"] = {
  resource: () => __vitePreload(() => import("./demo-basic-BBRtFFEQ.js").then((n) => n.i), true ? __vite__mapDeps([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]) : void 0),
  info: {
    "pid": "demo",
    "name": "basic",
    "relativeName": "demo-basic",
    "url": "demo/basic",
    "originalName": "demo-basic",
    "fullName": "zova-module-demo-basic",
    "vendor": false,
    "onionsMeta": {
      "onionsConfig": {
        "aop": {
          "home": {
            "match": "home-index.controller.pageHome"
          },
          "home3": {
            "dependencies": "demo-basic:home",
            "match": "regexp:///home-index\\.controller\\.pageHome/"
          }
        }
      }
    }
  }
};
modules["demo-todo"] = {
  resource: () => __vitePreload(() => import("./demo-todo-D-U9Yo-I.js"), true ? __vite__mapDeps([39,2,3,4,5,6,7,8,9,25,20]) : void 0),
  info: {
    "pid": "demo",
    "name": "todo",
    "relativeName": "demo-todo",
    "url": "demo/todo",
    "originalName": "demo-todo",
    "fullName": "zova-module-demo-todo",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-api"] = {
  resource: () => __vitePreload(() => import("./home-api-BsWdi2ni.js"), true ? __vite__mapDeps([40,2,3,4,5,25,7]) : void 0),
  info: {
    "pid": "home",
    "name": "api",
    "relativeName": "home-api",
    "url": "home/api",
    "originalName": "home-api",
    "fullName": "zova-module-home-api",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-base"] = {
  resource: () => __vitePreload(() => import("./home-base-D7OYPGUO.js"), true ? __vite__mapDeps([41,2,3,4,5,14,7,6,8,9,15,34,20]) : void 0),
  info: {
    "pid": "home",
    "name": "base",
    "relativeName": "home-base",
    "url": "home/base",
    "originalName": "home-base",
    "fullName": "zova-module-home-base",
    "vendor": false,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["home-icon"] = {
  resource: () => __vitePreload(() => import("./home-icon-B4SLHu9R.js"), true ? __vite__mapDeps([42,2,3,4,5,30,7]) : void 0),
  info: {
    "pid": "home",
    "name": "icon",
    "relativeName": "home-icon",
    "url": "home/icon",
    "originalName": "home-icon",
    "fullName": "zova-module-home-icon",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-index"] = {
  resource: () => __vitePreload(() => import("./home-index-znKZEwvf.js"), true ? __vite__mapDeps([43,2,3,4,5,7]) : void 0),
  info: {
    "pid": "home",
    "name": "index",
    "relativeName": "home-index",
    "url": "home/index",
    "originalName": "home-index",
    "fullName": "zova-module-home-index",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-layout"] = {
  resource: () => __vitePreload(() => import("./home-layout-W4uQDT6x.js"), true ? __vite__mapDeps([44,2,3,4,5,6,7,8,9,20,30]) : void 0),
  info: {
    "pid": "home",
    "name": "layout",
    "relativeName": "home-layout",
    "url": "home/layout",
    "originalName": "home-layout",
    "fullName": "zova-module-home-layout",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-login"] = {
  resource: () => __vitePreload(() => import("./home-login-Dxs1ZrtI.js"), true ? __vite__mapDeps([45,2,3,4,5,7,6,8,9,12,13]) : void 0),
  info: {
    "pid": "home",
    "name": "login",
    "relativeName": "home-login",
    "url": "home/login",
    "originalName": "home-login",
    "fullName": "zova-module-home-login",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["home-passport"] = {
  resource: () => __vitePreload(() => import("./home-passport-Bh_n0O8K.js"), true ? __vite__mapDeps([46,2,3,4,5,6,7,8,9,40,25]) : void 0),
  info: {
    "pid": "home",
    "name": "passport",
    "relativeName": "home-passport",
    "url": "home/passport",
    "originalName": "home-passport",
    "fullName": "zova-module-home-passport",
    "vendor": false,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["devui-adapter"] = {
  resource: () => __vitePreload(() => import("./devui-adapter-2igqXY4b.js"), true ? __vite__mapDeps([47,2,3,4,5,32,7]) : void 0),
  info: {
    "pid": "devui",
    "name": "adapter",
    "relativeName": "devui-adapter",
    "url": "devui/adapter",
    "originalName": "devui-adapter",
    "fullName": "zova-module-devui-adapter",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["basic-adapter"] = {
  resource: () => __vitePreload(() => import("./basic-adapter-BjVFxxKR.js"), true ? __vite__mapDeps([48,2,3,4,5,7]) : void 0),
  info: {
    "pid": "basic",
    "name": "adapter",
    "relativeName": "basic-adapter",
    "url": "basic/adapter",
    "originalName": "basic-adapter",
    "fullName": "zova-module-basic-adapter",
    "vendor": false,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["basic-date"] = {
  resource: () => __vitePreload(() => import("./basic-date-CSTs_cGU.js"), true ? __vite__mapDeps([49,2,3,4,5,7]) : void 0),
  info: {
    "pid": "basic",
    "name": "date",
    "relativeName": "basic-date",
    "url": "basic/date",
    "originalName": "basic-date",
    "fullName": "zova-module-basic-date",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["basic-form"] = {
  resource: () => __vitePreload(() => import("./basic-form-CqEhVmJ7.js"), true ? __vite__mapDeps([50,2,3,4,5,7,12,13,15,18,19,6,8,9]) : void 0),
  info: {
    "pid": "basic",
    "name": "form",
    "relativeName": "basic-form",
    "url": "basic/form",
    "originalName": "basic-form",
    "fullName": "zova-module-basic-form",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["basic-restpage"] = {
  resource: () => __vitePreload(() => import("./basic-restpage-DgTVfDPt.js"), true ? __vite__mapDeps([51,21,2,3,4,5,18,15,19,6,7,8,9,22,16,17]) : void 0),
  info: {
    "pid": "basic",
    "name": "restpage",
    "relativeName": "basic-restpage",
    "url": "basic/restpage",
    "originalName": "basic-restpage",
    "fullName": "zova-module-basic-restpage",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["basic-table"] = {
  resource: () => __vitePreload(() => import("./basic-table-ConTOqDj.js"), true ? __vite__mapDeps([52,2,3,4,5,7,22,21,18,15,19,6,8,9]) : void 0),
  info: {
    "pid": "basic",
    "name": "table",
    "relativeName": "basic-table",
    "url": "basic/table",
    "originalName": "basic-table",
    "fullName": "zova-module-basic-table",
    "vendor": false,
    "onionsMeta": {}
  }
};
modules["rest-actions"] = {
  resource: () => __vitePreload(() => import("./rest-actions-P9s_ZAuL.js"), true ? __vite__mapDeps([53,54,2,3,4,5,7]) : void 0),
  info: {
    "pid": "rest",
    "name": "actions",
    "relativeName": "rest-actions",
    "url": "rest/actions",
    "originalName": "rest-actions",
    "fullName": "zova-module-rest-actions",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["rest-resource"] = {
  resource: () => __vitePreload(() => import("./rest-resource-DMRZUtYT.js"), true ? __vite__mapDeps([55,2,3,4,5,16,17,18,15,19,6,7,8,9]) : void 0),
  info: {
    "pid": "rest",
    "name": "resource",
    "relativeName": "rest-resource",
    "url": "rest/resource",
    "originalName": "rest-resource",
    "fullName": "zova-module-rest-resource",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-action"] = {
  resource: () => __vitePreload(() => import("./a-action-8vTCicfl.js"), true ? __vite__mapDeps([54,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "action",
    "relativeName": "a-action",
    "url": "a/action",
    "originalName": "a-action",
    "fullName": "zova-module-a-action",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {
      "onions": {
        "action": {
          "beanGeneral": true,
          "optionsGlobalInterfaceName": "IDecoratorActionOptions",
          "optionsGlobalInterfaceFrom": "zova-module-a-action",
          "boilerplate": "cli/action/boilerplate",
          "metadataCustom": "cli/action/metadata/generate.ts"
        }
      }
    }
  }
};
modules["a-actions"] = {
  resource: () => __vitePreload(() => import("./a-actions-BsQyPCoV.js"), true ? __vite__mapDeps([56,54,2,3,4,5,7]) : void 0),
  info: {
    "pid": "a",
    "name": "actions",
    "relativeName": "a-actions",
    "url": "a/actions",
    "originalName": "a-actions",
    "fullName": "zova-module-a-actions",
    "vendor": true,
    "onionsMeta": {
      "beansPreload": ["a-actions.action.log"]
    }
  }
};
modules["a-behaviors"] = {
  resource: () => __vitePreload(() => import("./a-behaviors-Cpx3DPPu.js"), true ? __vite__mapDeps([57,2,3,4,5,12,7,13]) : void 0),
  info: {
    "pid": "a",
    "name": "behaviors",
    "relativeName": "a-behaviors",
    "url": "a/behaviors",
    "originalName": "a-behaviors",
    "fullName": "zova-module-a-behaviors",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-pinia"] = {
  resource: () => __vitePreload(() => import("./a-pinia-BGHj6dhI.js"), true ? __vite__mapDeps([10,2,3,4,5,7,11]) : void 0),
  info: {
    "pid": "a",
    "name": "pinia",
    "relativeName": "a-pinia",
    "url": "a/pinia",
    "originalName": "a-pinia",
    "fullName": "zova-module-a-pinia",
    "vendor": true,
    "capabilities": {
      "monkey": true
    },
    "onionsMeta": {}
  }
};
modules["a-routerstack"] = {
  resource: () => __vitePreload(() => import("./a-routerstack-C7iMbKSv.js"), true ? __vite__mapDeps([58,2,3,4,5,6,7,8,9,34,20]) : void 0),
  info: {
    "pid": "a",
    "name": "routerstack",
    "relativeName": "a-routerstack",
    "url": "a/routerstack",
    "originalName": "a-routerstack",
    "fullName": "zova-module-a-routerstack",
    "vendor": true,
    "onionsMeta": {}
  }
};
modules["a-routertabs"] = {
  resource: () => __vitePreload(() => import("./a-routertabs-Bw2Awcsu.js"), true ? __vite__mapDeps([59,2,3,4,5,6,7,8,9,34,20]) : void 0),
  info: {
    "pid": "a",
    "name": "routertabs",
    "relativeName": "a-routertabs",
    "url": "a/routertabs",
    "originalName": "a-routertabs",
    "fullName": "zova-module-a-routertabs",
    "vendor": true,
    "onionsMeta": {}
  }
};
const moduleNames = [];
moduleNames.push("a-fetch");
moduleNames.push("a-model");
moduleNames.push("a-openapi");
moduleNames.push("a-api");
moduleNames.push("a-app");
moduleNames.push("a-bean");
moduleNames.push("a-behavior");
moduleNames.push("a-boundary");
moduleNames.push("a-currency");
moduleNames.push("a-date");
moduleNames.push("a-form");
moduleNames.push("a-icon");
moduleNames.push("a-interceptor");
moduleNames.push("a-logger");
moduleNames.push("a-meta");
moduleNames.push("a-ssr");
moduleNames.push("a-router");
moduleNames.push("a-ssrhmr");
moduleNames.push("a-style");
moduleNames.push("a-table");
moduleNames.push("a-zod");
moduleNames.push("a-zova");
moduleNames.push("a-b");
moduleNames.push("demo-basic");
moduleNames.push("demo-todo");
moduleNames.push("home-api");
moduleNames.push("home-base");
moduleNames.push("home-icon");
moduleNames.push("home-index");
moduleNames.push("home-layout");
moduleNames.push("home-login");
moduleNames.push("home-passport");
moduleNames.push("devui-adapter");
moduleNames.push("basic-adapter");
moduleNames.push("basic-date");
moduleNames.push("basic-form");
moduleNames.push("basic-restpage");
moduleNames.push("basic-table");
moduleNames.push("rest-actions");
moduleNames.push("rest-resource");
moduleNames.push("a-action");
moduleNames.push("a-actions");
moduleNames.push("a-behaviors");
moduleNames.push("a-pinia");
moduleNames.push("a-routerstack");
moduleNames.push("a-routertabs");
const modulesMeta = {
  modules,
  moduleNames
};
const options = {
  modulesMeta,
  locales,
  config,
  env,
  legacyRoutes: routes
};
function getPluginZovaOptions() {
  return options;
}
class ControllerPageApp extends BeanControllerPageBase {
  async __init__() {
    const instance = getCurrentInstance();
    const app = instance.appContext.app;
    if (!app.zova) {
      await this.initApp(app);
    } else {
      await this.updateApp(app.zova);
    }
  }
  render() {
    const ComponentApp = this.$zovaComponent(this.sys.config.layout.app.component);
    return createVNode(ComponentApp, null, null);
  }
  async initApp(app) {
    const appZova = await PluginZova.install(app, this.ctx, getPluginZovaOptions());
    await appZova.meta.module._monkeyModule(true, "beanInit", void 0, appZova.bean, this);
  }
  async updateApp(app) {
    await PluginZova.update(app, this.ctx);
  }
}
const RootComponent = createZovaComponentPage(ControllerPageApp);
async function createQuasarApp(createAppFn, ssrContext) {
  const app = createAppFn(RootComponent);
  mainFn({ app, ssrContext });
  return {
    app
  };
}
async function start({
  app
}, bootFiles) {
  for (let i = 0; i < bootFiles.length; i++) {
    await bootFiles[i]({
      app
    });
  }
  app.mount("#q-app");
}
async function initApp() {
  return createQuasarApp(createSSRApp).then((app) => {
    const [method, mapFn] = Promise.allSettled !== void 0 ? [
      "allSettled",
      (bootFiles) => bootFiles.map((result) => {
        if (result.status === "rejected") {
          console.error("[Quasar] boot error:", result.reason);
          return;
        }
        return result.value.default;
      })
    ] : [
      "all",
      (bootFiles) => bootFiles.map((entry) => entry.default)
    ];
    return Promise[method]([
      __vitePreload(() => import("./zova-CV-Wh6Z0.js"), true ? __vite__mapDeps([60,2,3,4,5,61]) : void 0)
    ]).then((bootFiles) => {
      const boot = mapFn(bootFiles).filter((entry) => typeof entry === "function");
      return start(app, boot);
    });
  });
}
initApp();
export {
  getPluginZovaOptions as g
};
