import { _ as catchError, l as BeanInfo, n as BeanBase, L as BeanControllerBase, Z as BeanControllerPageBase, U as Use, ae as createZovaComponentPage, M as prepareComponentOptions, N as useController, a7 as useComputed, B as BeanSimple, v as BeanScopeBase, aa as useApp } from "./zova-QgocPMzS.js";
import { Css, BeanThemeBase, Theme } from "./a-style-uiQyot3t.js";
import { Service, Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { BeanRouterGuardsBase } from "./a-router-CjBFMDNv.js";
import { P as createVNode, N as createTextVNode, o as defineComponent } from "./vue-CRNsYCTs.js";
import { o as object, c as string, f as zhCN, g as en } from "./zod-DcU_E_GK.js";
import { d as RouterLink } from "./vue-router-DwxCgNw3.js";
import { c as classes } from "./typestyle-BzUluVB3.js";
import "./commonjsHelper-CCIqAdii.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$8, _dec2$8, _class$8;
let ServiceRouterGuards = (_dec$8 = Service(), _dec2$8 = BeanInfo({
  module: "home-base"
}), _dec$8(_class$8 = _dec2$8(_class$8 = class ServiceRouterGuards2 extends BeanRouterGuardsBase {
  onRouterGuards(router) {
    router.beforeEach(async (to) => {
      if (to.meta.requiresAuth !== false && !this.$passport.isAuthenticated) {
        const [_res, err] = await catchError(() => {
          return this.$passport.ensurePassport();
        });
        if (err) {
          this.$errorHandler(err, "onRouterGuards");
          return false;
        }
        if (!this.$passport.isAuthenticated) {
          this.app.$gotoLogin(to.fullPath);
          return false;
        }
      }
    });
  }
}) || _class$8) || _class$8);
var _dec$7, _dec2$7, _class$7;
const ErrorMessageJwtExpired = "jwt expired";
let ServiceSsr = (_dec$7 = Service(), _dec2$7 = BeanInfo({
  module: "home-base"
}), _dec$7(_class$7 = _dec2$7(_class$7 = class ServiceSsr2 extends BeanBase {
  async initialize() {
    {
      this.ctx.meta.$ssr.onHydrated(() => {
      });
    }
  }
  _ssrErrorHandler() {
    return;
  }
}) || _class$7) || _class$7);
var _dec$6, _dec2$6, _class$6, _ControllerPage;
let ControllerPage = (_dec$6 = Controller(), _dec2$6 = BeanInfo({
  module: "home-base"
}), _dec$6(_class$6 = _dec2$6(_class$6 = (_ControllerPage = class ControllerPage2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.cPage = void 0;
  }
  async __init__() {
    this.cPage = this.$style({
      padding: "16px"
    });
  }
  render() {
    return createVNode("div", {
      "class": this.cPage
    }, [this.$slotDefault?.()]);
  }
}, _ControllerPage.$propsDefault = {}, _ControllerPage)) || _class$6) || _class$6);
var _dec$5, _dec2$5, _class$5;
const ControllerPageAuthCallbackSchemaQuery = object({
  "returnTo": string().optional(),
  "x-vona-oauth-code": string().optional()
});
let ControllerPageAuthCallback = (_dec$5 = Controller(), _dec2$5 = BeanInfo({
  module: "home-base"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class ControllerPageAuthCallback2 extends BeanControllerPageBase {
  async __init__() {
    {
      this._handleAuth();
    }
  }
  async _handleAuth() {
    const code = this.$query["x-vona-oauth-code"];
    await this.$passport.loginByOauthCode().mutateAsync({
      code
    });
  }
  render() {
    return null;
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _dec3, _dec4, _class$4, _class2, _descriptor;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ControllerPageErrorExpiredSchemaQuery = object({
  returnTo: string().optional()
});
let ControllerPageErrorExpired = (_dec$4 = Controller(), _dec2$4 = BeanInfo({
  module: "home-base"
}), _dec3 = Use("home-api.service.jwtAdapter"), _dec4 = Reflect.metadata("design:type", typeof ServiceJwtAdapter === "undefined" ? Object : ServiceJwtAdapter), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = class ControllerPageErrorExpired2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$jwtAdapter", _descriptor, this);
  }
  async __init__() {
    {
      this._refreshToken();
    }
  }
  async _refreshToken() {
    const returnTo = this.$query.returnTo;
    const jwtInfo = await this.$$jwtAdapter.getJwtInfo();
    const refreshToken = jwtInfo?.refreshToken;
    if (!refreshToken) {
      this.app.$gotoPage(this.sys.env.ROUTER_PAGE_LOGIN, {
        returnTo,
        replace: true
      });
      return;
    }
    await this.$$jwtAdapter.refreshAuthToken(refreshToken);
    this.app.$gotoReturnTo(returnTo);
  }
  render() {
    return null;
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$jwtAdapter", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let ControllerPageErrorNotFound = (_dec$3 = Controller(), _dec2$3 = BeanInfo({
  module: "home-base"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class ControllerPageErrorNotFound2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.cTitle = void 0;
    this.cDescription = void 0;
  }
  async __init__() {
    this.cTitle = this.$style({
      fontSize: "30vh"
    });
    this.cDescription = classes("text-3xl", this.$style({
      opacity: "0.4"
    }));
  }
  render() {
    return createVNode("div", {
      "class": "text-center"
    }, [createVNode("div", null, [createVNode("div", {
      "class": this.cTitle
    }, [createTextVNode("404")]), createVNode("div", {
      "class": this.cDescription
    }, [createTextVNode("Oops. Nothing here...")]), createVNode(RouterLink, {
      "to": this.sys.env.ROUTER_PAGE_HOME
    }, {
      default: () => [createTextVNode("Go Home")]
    })])]);
  }
}) || _class$3) || _class$3);
let NSControllerPageAuthCallback;
(function(_NSControllerPageAuthCallback) {
  _NSControllerPageAuthCallback.querySchema = ControllerPageAuthCallbackSchemaQuery;
})(NSControllerPageAuthCallback || (NSControllerPageAuthCallback = {}));
const ZPageAuthCallback = createZovaComponentPage(ControllerPageAuthCallback, void 0, void 0);
let NSControllerPageErrorExpired;
(function(_NSControllerPageErrorExpired) {
  _NSControllerPageErrorExpired.querySchema = ControllerPageErrorExpiredSchemaQuery;
})(NSControllerPageErrorExpired || (NSControllerPageErrorExpired = {}));
const ZPageErrorExpired = createZovaComponentPage(ControllerPageErrorExpired, void 0, void 0);
const ZPageErrorNotFound = createZovaComponentPage(ControllerPageErrorNotFound, void 0, void 0);
const routes = [{
  path: "/:catchAll(.*)*",
  component: ZPageErrorNotFound,
  meta: {
    absolute: true,
    layout: "empty",
    requiresAuth: false
  }
}, {
  path: "errorNotFound",
  component: ZPageErrorNotFound,
  meta: {
    layout: "empty",
    requiresAuth: false
  }
}, {
  path: "errorExpired",
  component: ZPageErrorExpired,
  meta: {
    layout: "empty",
    requiresAuth: false
  }
}, {
  path: "authCallback",
  component: ZPageAuthCallback,
  meta: {
    layout: "empty",
    requiresAuth: false
  }
}];
const ZPage = defineComponent((_props) => {
  useController(ControllerPage, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$2, _dec2$2, _class$2;
let CssDefault = (_dec$2 = Css(), _dec2$2 = BeanInfo({
  module: "home-base"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class CssDefault2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.textCenter = void 0;
    this.buttonPrimary = void 0;
  }
  async __init__() {
    this.textCenter = this.$style({
      textAlign: "center"
    });
    this.buttonPrimary = useComputed(() => {
      return this.$style({
        color: this.$token.color.primary,
        borderColor: this.$token.var.borderColor
      });
    });
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let ThemeDefault = (_dec$1 = Theme(), _dec2$1 = BeanInfo({
  module: "home-base"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ThemeDefault2 extends BeanThemeBase {
  async apply({
    name,
    dark
  }) {
    const token = {
      color: {
        primary: "oklch(45% 0.24 277.023)"
      },
      var: {
        borderColor: "#297acc"
      },
      component: {
        page: {
          background: dark ? "#121212" : "#fff",
          color: dark ? "#fff" : "#000"
        }
      }
    };
    return {
      token: this.mergeOptionsToken({
        name,
        dark
      }, token)
    };
  }
}) || _class$1) || _class$1);
const __ThisModule__ = "home-base";
function definePropertyScopeBase(bean, beanInstance) {
  bean.defineProperty(beanInstance, "$scopeBase", {
    enumerable: false,
    configurable: true,
    get() {
      return bean.scope(__ThisModule__);
    }
  });
}
class Monkey extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.serviceRouterGuards = void 0;
    this.serviceSsr = void 0;
  }
  async appInitialize() {
    this.serviceRouterGuards = await this.bean._newBean(ServiceRouterGuards, false);
    this.serviceSsr = await this.bean._newBean(ServiceSsr, false);
    await this.serviceSsr.initialize();
  }
  appClose() {
    if (this.serviceRouterGuards) {
      this.serviceRouterGuards.dispose();
    }
  }
  async beanInit(bean, beanInstance) {
    definePropertyScopeBase(bean, beanInstance);
  }
}
class MonkeySys extends BeanSimple {
  async beanInit(bean, beanInstance) {
    definePropertyScopeBase(bean, beanInstance);
  }
}
class Main extends BeanSimple {
  async moduleLoading() {
  }
  async moduleLoaded() {
    {
      const localeErrors = {
        "en-us": en,
        "zh-cn": zhCN
      };
      this.app.util.setLocaleErrors(localeErrors, this.sys.config.locale.default);
    }
  }
}
var _dec, _dec2, _class;
const pagePathSchemas = {
  "/home/base/authCallback": {
    query: NSControllerPageAuthCallback.querySchema
  },
  "/home/base/errorExpired": {
    query: NSControllerPageErrorExpired.querySchema
  }
};
const pageNameSchemas = {};
const components = {
  "page": ZPage
};
let ScopeModuleHomeBase = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-base"
}), _dec(_class = _dec2(_class = class ScopeModuleHomeBase2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `home-base::${key}`;
}
const locale_en_us = {
  Home: "Home"
};
const locale_zh_cn = {
  Home: "主页"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `home-base::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  ControllerPage,
  ControllerPageAuthCallback,
  ControllerPageAuthCallbackSchemaQuery,
  ControllerPageErrorExpired,
  ControllerPageErrorExpiredSchemaQuery,
  ControllerPageErrorNotFound,
  CssDefault,
  ErrorMessageJwtExpired,
  Main,
  Monkey,
  MonkeySys,
  NSControllerPageAuthCallback,
  NSControllerPageErrorExpired,
  ScopeModuleHomeBase,
  ServiceRouterGuards,
  ServiceSsr,
  ThemeDefault,
  ZPage,
  ZPageAuthCallback,
  ZPageErrorExpired,
  ZPageErrorNotFound,
  components,
  definePropertyScopeBase,
  locale,
  locales,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
