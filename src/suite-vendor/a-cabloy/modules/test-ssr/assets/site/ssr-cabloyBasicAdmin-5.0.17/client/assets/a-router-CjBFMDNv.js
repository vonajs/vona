import { l as BeanInfo, n as BeanBase, m as cast, a4 as combineParamsAndQuery, a5 as parseName, h as deepExtend, U as Use, V as Virtual, a6 as parseInfo, L as BeanControllerBase, M as prepareComponentOptions, N as useController, B as BeanSimple, a7 as useComputed, Z as BeanControllerPageBase, a8 as combineQueries, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model } from "./a-model-DdQjWvuo.js";
import { r as routerViewLocationKey, c as createWebHistory, a as createWebHashHistory, b as createRouter, R as RouterView } from "./vue-router-DwxCgNw3.js";
import { Sys, Bean, Service, Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { k as inject, P as createVNode, M as h, _ as KeepAlive, $ as Transition, o as defineComponent, s as shallowReactive } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$6, _dec2$6, _class$6;
let ModelPageData = (_dec$6 = Model(), _dec2$6 = BeanInfo({
  module: "a-router"
}), _dec$6(_class$6 = _dec2$6(_class$6 = class ModelPageData2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this._pageDataInner = void 0;
    this.current = void 0;
  }
  async __init__() {
    {
      if (this.$ssr.isRuntimeSsrPreHydration) {
        this.current = this.$ssr.state.pageData;
      } else {
        const route = this.$pageRoute;
        this.current = route ? this.getPageData(route.path) : void 0;
      }
    }
  }
  getPageData(pagePath) {
    return this.$useStateMem({
      queryKey: ["pageData", pagePath]
    });
  }
}) || _class$6) || _class$6);
const pageRouteKey = "$$pageRoute";
const routerViewKey = "$$routerView";
function getRouteMatched(route) {
  let match = route.matched.find((item) => item.aliasOf);
  if (match) {
    match = match.aliasOf;
  } else {
    match = route.matched[route.matched.length - 1];
  }
  return match;
}
function getRealRouteName(name) {
  if (!name) return void 0;
  name = String(name);
  if (name.startsWith("$:")) return void 0;
  return name;
}
function isRouterName(name) {
  return !!name && name.includes(":") && !name.includes("/");
}
function getPageRoute(ctx) {
  const route = ctx.bean._getBeanFromHost({
    name: pageRouteKey
  });
  return route;
}
function getCurrentRoute(ctx) {
  const route = ctx.util.instanceScope(() => {
    return inject(routerViewLocationKey);
  });
  return route;
}
const scrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition);
      }, 100);
    });
  } else if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash
        });
      }, 200);
    });
  } else {
    return {
      left: 0,
      top: 0
    };
  }
};
const SymbolRouterHistory = /* @__PURE__ */ Symbol("SymbolRouterHistory");
var _dec$5, _dec2$5, _class$5;
let SysRouter = (_dec$5 = Sys(), _dec2$5 = BeanInfo({
  module: "a-router"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class SysRouter2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._vueRouterSys = void 0;
  }
  get router() {
    return this._vueRouterSys;
  }
  __get__(prop) {
    return this._vueRouterSys && this._vueRouterSys[prop];
  }
  async __init__() {
    this._vueRouterSys = this.createRouter();
    this._loadConfigRoutes();
    this._loadLegacyRoutes();
  }
  createRouter(options) {
    options = Object.assign({}, options);
    if (!options.matcher) {
      options.matcher = this._vueRouterSys?.matcher;
    }
    if (!options.routes) {
      if (!this._vueRouterSys) {
        options.routes = [];
      }
    }
    if (!options.scrollBehavior) {
      options.scrollBehavior = this.scope.config.scrollBehavior;
    }
    if (!options.history) {
      const createHistory = this.sys.env.ROUTER_MODE === "history" ? createWebHistory : createWebHashHistory;
      const routeBase = this.sys.env.ROUTER_MODE === "history" ? this.sys.env.APP_PUBLIC_PATH : void 0;
      options.history = createHistory(routeBase);
    }
    const router = createRouter(options);
    cast(router).__hasDevtools = true;
    router[SymbolRouterHistory] = options.history;
    return router;
  }
  createAsyncComponent(component) {
    if (typeof component !== "string") return component;
    return this.sys.meta.component.createAsyncComponent(component);
  }
  getPagePath(path, options, absolute) {
    const pagePath = combineParamsAndQuery(path, {
      params: options?.params,
      query: options?.query
    });
    return absolute ? this.sys.util.getAbsoluteUrlFromPagePath(pagePath) : pagePath;
  }
  async resolveRoute(url, check404, checkAliasOf) {
    const pagePath = this.sys.util.getPagePathFromAbsoluteUrl(url);
    let route = await this.ensureRoute(pagePath);
    if (check404 && route.name === "$:/:catchAll(.*)*") return;
    if (checkAliasOf) {
      const matchItem = route.matched.find((item) => item.aliasOf);
      if (matchItem) {
        route = matchItem.aliasOf;
      }
      if (check404 && route.name === "$:/:catchAll(.*)*") return;
    }
    return route;
  }
  checkPathValid(to) {
    const _name = to && typeof to === "object" ? to.name : void 0;
    const _path = to && typeof to === "object" ? to.name ?? to.path : to;
    if (this._findLegacyRoute(_name, _path)) return true;
    if (!_path) return true;
    const moduleName = parseName(_path);
    if (!moduleName) return true;
    return this.sys.meta.module.exists(moduleName);
  }
  async ensureRoute(pagePath) {
    let route = this._vueRouterSys.resolve(pagePath);
    if (route && route.name !== "$:/:catchAll(.*)*") return route;
    const moduleName = parseName(pagePath);
    if (moduleName) {
      if (this.sys.meta.module.exists(moduleName)) {
        const module = this.sys.meta.module.get(moduleName);
        if (!module) {
          await this.sys.meta.module.use(moduleName);
          route = this._vueRouterSys.resolve(pagePath);
        }
      }
    }
    return route;
  }
  /** @internal */
  _registerRoutes(module) {
    if (!module.resource.routes) return;
    for (const route of module.resource.routes) {
      this._registerRoute(route, module);
    }
  }
  /** @internal */
  _findConfigRoute(name, path) {
    name = this.getRealRouteName(name);
    return name ? this.sys.config.routes.name[name] : this.sys.config.routes.path[path];
  }
  /** @internal */
  _findLegacyRoute(name, path) {
    const legacyRoutes = cast(this.sys.meta).legacyRoutes;
    if (!legacyRoutes) return;
    name = this.getRealRouteName(name);
    return legacyRoutes.find((item) => {
      return name ? item.name === name : item.path === path;
    });
  }
  getRouteMatched(route) {
    return getRouteMatched(route);
  }
  getRealRouteName(name) {
    return getRealRouteName(name);
  }
  isRouterName(name) {
    return isRouterName(name);
  }
  resolveName(name, options) {
    const params = cast(options)?.params;
    const query = cast(options)?.query;
    return this._resolveNameOrPath(query, (query2) => {
      const route = this.router.resolve({
        name,
        params,
        query: query2
      });
      return route.fullPath;
    });
  }
  resolvePath(path, query) {
    return this._resolveNameOrPath(query, (query2) => {
      const route = this.router.resolve({
        path,
        query: query2
      });
      return route.fullPath;
    });
  }
  _resolveNameOrPath(query, fn) {
    const query1 = {};
    const query2 = [];
    if (query) {
      for (const key in query) {
        const value = query[key];
        if (value && typeof value === "object") {
          query2.push([key, value]);
        } else {
          query1[key] = value;
        }
      }
    }
    const fullPath = fn(query1);
    const query2str = query2.map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
    }).join("&");
    if (!query2str) return fullPath;
    const join = Object.keys(query1).length > 0 ? "&" : "?";
    return `${fullPath}${join}${query2str}`;
  }
  _loadConfigRoutes() {
    const routesPath = this.sys.config.routes.path;
    for (const key in routesPath) {
      const route = routesPath[key];
      if (!route) continue;
      this._loadConfigRoute({
        ...route,
        path: key,
        name: `$:${key}`
      });
    }
    const routesName = this.sys.config.routes.name;
    for (const key in routesName) {
      const route = routesName[key];
      if (!route) continue;
      this._loadConfigRoute({
        ...route,
        path: route.path || route.alias,
        name: key
      });
    }
  }
  _loadLegacyRoutes() {
    const legacyRoutes = cast(this.sys.meta).legacyRoutes;
    if (!legacyRoutes) return;
    for (const route of legacyRoutes) {
      this._registerRoute(route);
    }
  }
  _loadConfigRoute(route) {
    this.router.addRoute(route);
  }
  _registerRoute(route, module) {
    let path;
    if (route.path !== void 0) {
      if (!module || route.meta?.absolute === true) {
        path = route.path;
      } else {
        path = route.path ? `/${module.info.pid}/${module.info.name}/${route.path}` : `/${module.info.pid}/${module.info.name}`;
      }
    }
    let name;
    if (route.name) {
      if (!module || route.meta?.absolute === true) {
        name = String(route.name);
      } else {
        name = `${module.info.relativeName}:${String(route.name)}`;
      }
    }
    const configRoute = name ? this.sys.config.routes.name[name] : this.sys.config.routes.path[path];
    if (configRoute) {
      route = deepExtend({}, route, configRoute);
    }
    if (name && configRoute?.alias) {
      this.router.addRoute({
        name: `$alias:${name}`,
        path: `/__alias__${configRoute?.alias}`,
        redirect: ""
      });
    }
    if (!name) {
      name = `$:${path}`;
    }
    const meta = route.meta;
    const component = route.component;
    let layout = meta?.layout;
    let routeData;
    let routeNameParent;
    if (layout === false) {
      routeData = {
        ...route,
        name,
        path,
        component,
        meta
      };
    } else {
      if (layout === void 0 || layout === "default") {
        layout = this.sys.config.layout.component.default;
      } else if (layout === "empty") {
        layout = this.sys.config.layout.component.empty;
      }
      routeNameParent = `$:${name}`;
      routeData = {
        name: routeNameParent,
        path,
        component: this.createAsyncComponent(layout),
        children: [{
          ...route,
          name,
          path: "",
          component,
          meta
        }]
      };
    }
    if (this.router.hasRoute(routeNameParent)) {
      this.router.removeRoute(routeNameParent);
    }
    if (this.router.hasRoute(name)) {
      this.router.removeRoute(name);
    }
    this.router.addRoute(routeData);
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _dec3$1, _dec4, _dec5, _dec6, _class$4, _class2, _descriptor, _descriptor2;
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
let BeanRouter = (_dec$4 = Bean(), _dec2$4 = BeanInfo({
  module: "a-router"
}), _dec3$1 = Use(), _dec4 = Reflect.metadata("design:type", typeof SysRouter === "undefined" ? Object : SysRouter), _dec5 = Use(), _dec6 = Reflect.metadata("design:type", typeof ModelPageData === "undefined" ? Object : ModelPageData), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = class BeanRouter2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._vueRouterApp = void 0;
    this._eventRouterGuards = [];
    this._routerViews = [];
    _initializerDefineProperty(this, "$$sysRouter", _descriptor, this);
    _initializerDefineProperty(this, "$$modelPageData", _descriptor2, this);
  }
  // for prepare pageData on server
  get router() {
    return this._vueRouterApp;
  }
  __dispose__() {
    for (const fn of this._eventRouterGuards) {
      fn();
    }
  }
  __get__(prop) {
    const value = this._vueRouterApp?.[prop];
    if (value !== void 0) return value;
    return this.$$sysRouter?.[prop];
  }
  async __init__(mainRouter) {
    this._vueRouterApp = this.$$sysRouter.createRouter();
    if (!mainRouter) {
      await this.app.meta.event.emit("a-router:routerGuards", this);
    }
  }
  addRouterView(routerView) {
    this._routerViews.push(routerView);
  }
  removeRouterView(routerView) {
    const index = this._routerViews.findIndex((item) => item === routerView);
    if (index > -1) {
      this._routerViews.splice(index, 1);
    }
  }
  afterEachBackRoute(route) {
    for (const routerView of this._routerViews) {
      const res = routerView.backRoute(route);
      if (res) break;
    }
  }
  afterEachForwardRoute(route) {
    for (const routerView of this._routerViews) {
      const res = routerView.forwardRoute(route);
      if (res) break;
    }
  }
  beforeEach(guard) {
    const fn = this._vueRouterApp.beforeEach(guard);
    this._eventRouterGuards.push(fn);
    return fn;
  }
  beforeResolve(guard) {
    const fn = this._vueRouterApp.beforeResolve(guard);
    this._eventRouterGuards.push(fn);
    return fn;
  }
  afterEach(guard) {
    const fn = this._vueRouterApp.afterEach(guard);
    this._eventRouterGuards.push(fn);
    return fn;
  }
  onError(handler) {
    const fn = this._vueRouterApp.onError(handler);
    this._eventRouterGuards.push(fn);
    return fn;
  }
  setPageMeta(route, pageMeta) {
    for (const routerView of this._routerViews) {
      routerView.setPageMeta(route, pageMeta);
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$sysRouter", [_dec3$1, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "$$modelPageData", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$4) || _class$4);
var _dec$3, _dec2$3, _dec3, _class$3;
let BeanRouterGuardsBase = (_dec$3 = Bean(), _dec2$3 = Virtual(), _dec3 = BeanInfo({
  module: "a-router"
}), _dec$3(_class$3 = _dec2$3(_class$3 = _dec3(_class$3 = class BeanRouterGuardsBase2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._eventRouterGuards = void 0;
  }
  async __init__() {
    this._eventRouterGuards = this.app.meta.event.on("a-router:routerGuards", async (router, next) => {
      this.onRouterGuards(router);
      return await next();
    });
  }
  __dispose__() {
    this.dispose();
  }
  dispose() {
    if (this._eventRouterGuards) {
      this._eventRouterGuards();
    }
  }
  onRouterGuards(_router) {
  }
}) || _class$3) || _class$3) || _class$3);
let NavigationType = /* @__PURE__ */ (function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
  return NavigationType2;
})({});
let NavigationDirection = /* @__PURE__ */ (function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
  return NavigationDirection2;
})({});
var _dec$2, _dec2$2, _class$2;
let ServiceRouterGuards = (_dec$2 = Service(), _dec2$2 = BeanInfo({
  module: "a-router"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ServiceRouterGuards2 extends BeanRouterGuardsBase {
  onRouterGuards(router) {
    const self = this;
    router.beforeEach(async (to) => {
      let match = to.matched.find((item) => item.aliasOf);
      if (match) {
        match = match.aliasOf;
      } else {
        match = to.matched[to.matched.length - 1];
        if (!await this._prepareCheck(match?.path, to.path)) {
          return to.fullPath;
        }
        const legacyRoute = router._findLegacyRoute(match?.name, match?.path);
        if (legacyRoute) return;
        const configRoute = router._findConfigRoute(match?.name, match?.path);
        const alias = configRoute?.alias;
        if (alias) {
          const resLoadModule2 = await this._forceLoadModule(router, match?.name, match?.path);
          if (resLoadModule2 && resLoadModule2 !== true) return resLoadModule2;
          if (resLoadModule2 === false) return to.fullPath;
          if (router.getRealRouteName(match?.name)) {
            const routeAlias = router.resolveName(`$alias:${match?.name}`, {
              params: to.params,
              query: to.query
            });
            const fullPath = routeAlias.startsWith("/__alias__") ? routeAlias.substring("/__alias__".length) : routeAlias;
            return fullPath || "/";
          } else {
            return {
              path: Array.isArray(alias) ? alias[0] : alias,
              params: to.params,
              query: to.query
            };
          }
        }
      }
      const resLoadModule = await this._forceLoadModule(router, match?.name, match?.path);
      if (resLoadModule === true) return;
      if (resLoadModule) return resLoadModule;
      return to.fullPath;
    });
    router.afterEach(function(to, from, error) {
      if (error) return;
      const info = arguments[3];
      if (from.fullPath !== to.fullPath) {
        self._afterEachFrom(router, from, info);
      }
      router.afterEachForwardRoute(to);
    });
  }
  _afterEachFrom(router, from, info) {
    if (!info) return;
    const needBack = info.type === NavigationType.pop && info.direction === NavigationDirection.back || info.type === NavigationType.push && info.replace;
    if (!needBack) return;
    router.afterEachBackRoute(from);
  }
  // if 404 then check if module loaded
  async _prepareCheck(pathMatched, pathTo) {
    if (pathMatched === "/:catchAll(.*)*") {
      const moduleInfo = parseInfo(parseName(pathTo));
      if (moduleInfo && this.app.meta.module.exists(moduleInfo.relativeName) && !this.app.meta.module.get(moduleInfo.relativeName, false)) {
        await this.app.meta.module.use(moduleInfo.relativeName);
        return false;
      }
    }
    return true;
  }
  async _forceLoadModule(router, name, path) {
    const nameOrPath = router.getRealRouteName(name) || path;
    const moduleInfo = parseInfo(parseName(nameOrPath));
    if (!moduleInfo) {
      return true;
    }
    const moduleName = moduleInfo.relativeName;
    if (!this.app.meta.module.exists(moduleName)) return "/404";
    const module = this.app.meta.module.get(moduleName, false);
    if (module) return true;
    await this.app.meta.module.use(moduleName);
    return false;
  }
}) || _class$2) || _class$2);
class BeanRouterViewBase extends BeanControllerBase {
  async __init__() {
    this.bean._setBean(routerViewKey, this);
    this.$router.addRouterView(this);
  }
  __dispose__() {
    this.$router.removeRouterView(this);
  }
  backRoute(_route) {
    return false;
  }
  forwardRoute(_route) {
    return false;
  }
  setPageMeta(_route, _pageMeta) {
  }
  prepareRouteMeta(_route) {
    throw new Error("Not Implemented");
  }
  getKeepAliveInclude() {
    throw new Error("Not Implemented");
  }
  render() {
    const slots = {
      default: (component) => {
        const routeMeta = this.prepareRouteMeta(component.route);
        return h(Transition, null, {
          default: () => {
            const vnode = h(component.Component, {
              key: routeMeta.componentKey
            });
            cast(vnode).zovaHostProviders = {
              [pageRouteKey]: component.route
            };
            return [h(KeepAlive, {
              include: this.getKeepAliveInclude()
            }, [vnode])];
          }
        });
      }
    };
    return createVNode(RouterView, null, slots);
  }
}
var _dec$1, _dec2$1, _class$1;
let ControllerRouterViewEmpty = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "a-router"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ControllerRouterViewEmpty2 extends BeanRouterViewBase {
  async __init__() {
  }
  render() {
    const slots = {
      default: (component) => {
        const vnode = h(component.Component);
        cast(vnode).zovaHostProviders = {
          [pageRouteKey]: component.route
        };
        return vnode;
      }
    };
    return createVNode(RouterView, null, slots);
  }
}) || _class$1) || _class$1);
const ZRouterViewEmpty = defineComponent((_props) => {
  useController(ControllerRouterViewEmpty, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const config = (_sys) => {
  return {
    scrollBehavior
  };
};
class Monkey extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._beanRouter = void 0;
    this.serviceRouterGuards = void 0;
  }
  async getBeanRouter() {
    if (!this._beanRouter) {
      this._beanRouter = this.app.meta.$router = await this.bean._getBean("a-router.bean.router", true, true);
    }
    return this._beanRouter;
  }
  async appInitialize() {
    this.serviceRouterGuards = await this.bean._newBean(ServiceRouterGuards, false);
    {
      this._ssrErrorHandler();
    }
  }
  async appInitialized() {
    const beanRouter = await this.getBeanRouter();
    await this.app.meta.event.emit("a-router:routerGuards", beanRouter);
  }
  appClose() {
    if (this.serviceRouterGuards) {
      this.serviceRouterGuards.dispose();
    }
  }
  async appReady() {
    const beanRouter = await this.getBeanRouter();
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      const pagePathFull = this.ctx.meta.$ssr.state.pagePathFull;
      if (pagePathFull) {
        const routerHistory = beanRouter.router[SymbolRouterHistory];
        routerHistory.push(pagePathFull);
      }
    }
    this.app.vue.use(beanRouter);
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      await beanRouter.isReady();
    }
  }
  async beanInit(bean, beanInstance) {
    bean.defineProperty(beanInstance, "$router", {
      enumerable: false,
      configurable: true,
      get() {
        return bean._getBeanFromHost("a-router.bean.router");
      }
    });
    bean.defineProperty(beanInstance, "$routerView", {
      enumerable: false,
      configurable: true,
      get() {
        return bean._getBeanFromHost({
          name: routerViewKey
        });
      }
    });
    bean.defineProperty(beanInstance, "$pageRoute", {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => {
          return getPageRoute(cast(bean).ctx);
        });
      }
    });
    bean.defineProperty(beanInstance, "$currentRoute", {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => {
          return getCurrentRoute(cast(bean).ctx);
        });
      }
    });
  }
  controllerDataPrepare(controllerData, ctx) {
    controllerData.context.route = getPageRoute(ctx);
  }
  controllerDataInit(controllerData, controller) {
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = controllerData.context.route;
    this._initControllerRoute(route, controller);
  }
  controllerDataUpdate(controller) {
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = getPageRoute(cast(cast(controller).ctx));
    this._initControllerRoute(route, controller);
  }
  _initControllerRoute(route, controller) {
    if (!route) return;
    const routeMatched = getRouteMatched(route);
    if (!routeMatched) return;
    if (controller.$routeMatched && !this._checkIfRouteSame(routeMatched, controller.$routeMatched)) return;
    const changed = !controller.$route || controller.$route.fullPath !== route.fullPath;
    if (!changed) return;
    controller.$route = route;
    controller.$routeMatched = routeMatched;
    const routeName = getRealRouteName(routeMatched.name);
    const schemaKey = routeName || String(routeMatched.path);
    let schemas;
    const moduleInfo = parseInfo(parseName(schemaKey));
    if (!moduleInfo) {
      return;
    }
    if (!this.app.meta.module.exists(moduleInfo.relativeName)) {
      return;
    }
    const module = this.app.meta.module.get(moduleInfo.relativeName);
    if (routeName) {
      schemas = module.resource.pageNameSchemas?.[schemaKey];
    } else {
      schemas = module.resource.pagePathSchemas?.[schemaKey];
    }
    if (schemas?.params) {
      const params = schemas.params.parse(route.params);
      if (!controller.$params) {
        controller.$params = shallowReactive(params);
      } else {
        Object.assign(controller.$params, params);
      }
    }
    if (schemas?.query) {
      const query = schemas.query.parse(route.query);
      if (!controller.$query) {
        controller.$query = shallowReactive(query);
      } else {
        Object.assign(controller.$query, query);
      }
    }
  }
  _checkIfRouteSame(route1, route2) {
    return route1.name && route1.name === route2.name || route1.path === route2.path;
  }
  _ssrErrorHandler() {
    this.app.meta.event.on("app:errorHandler", (data, next) => {
      const err = next();
      if (!err || !(err instanceof Error)) return err;
      return this._errorHandlerDefaultClient(err, data);
    });
  }
  _errorHandlerDefaultClient(err, _data) {
    if ([301, 302].includes(Number(err.code))) {
      this.app.$gotoPage(err.pagePath);
      return void 0;
    }
    if (err.code === 600) {
      return void 0;
    }
    if (err.code === 401) {
      this.app.$gotoLogin();
      return void 0;
    }
    return err;
  }
}
class MonkeySys extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this._sysRouter = void 0;
    this._moduleSelf = moduleSelf;
  }
  async getSysRouter() {
    if (!this._sysRouter) {
      this._sysRouter = await this.bean._getBean("a-router.sys.router", false);
    }
    return this._sysRouter;
  }
  async moduleLoading(module) {
    if (this._moduleSelf === module) return;
    if (!module.resource.routes) return;
    const sysRouter = await this.getSysRouter();
    sysRouter._registerRoutes(module);
  }
  async moduleLoaded(_module) {
  }
  async configLoaded(_module, _config) {
  }
  sysApplicationInitialize(app) {
    app.$redirect = (pagePath, status) => {
      const error = new Error();
      error.code = status ?? 302;
      if (pagePath.startsWith("http://") || pagePath.startsWith("https://")) {
        error.pagePath = pagePath;
        error.url = pagePath;
      } else {
        error.pagePath = pagePath;
        error.url = app.sys.util.getAbsoluteUrlFromPagePath(pagePath, true);
      }
      error.message = error.pagePath;
      throw error;
    };
    app.$gotoPage = (pagePath, options) => {
      const query = options?.query ?? {};
      if (options?.returnTo) {
        const returnTo = typeof options?.returnTo === "string" ? options?.returnTo : app.$getCurrentPagePath();
        if (returnTo !== app.sys.env.ROUTER_PAGE_HOME) {
          query[app.sys.env.ROUTER_KEY_RETURNTO] = returnTo;
        }
      }
      pagePath = combineQueries(pagePath, query);
      if (options?.forceRedirect) {
        return app.$redirect(pagePath);
      }
      if (pagePath.startsWith("http://") || pagePath.startsWith("https://")) {
        window.location[options?.replace ? "replace" : "assign"](pagePath);
      } else {
        return app.meta.$router[options?.replace ? "replace" : "push"](pagePath);
      }
    };
    app.$gotoHome = () => {
      return app.$gotoPage(app.sys.env.ROUTER_PAGE_HOME);
    };
    app.$gotoLogin = (returnTo, cause) => {
      if (!returnTo && cast(app.meta.$router.currentRoute)?.path === app.sys.env.ROUTER_PAGE_LOGIN) return;
      const query = {};
      if (cause) {
        query.cause = cause;
      }
      const returnTo2 = returnTo === app.sys.env.ROUTER_PAGE_LOGIN ? void 0 : returnTo ?? true;
      return app.$gotoPage(app.sys.env.ROUTER_PAGE_LOGIN, {
        query,
        returnTo: returnTo2
      });
    };
    app.$gotoReturnTo = (returnTo) => {
      const pagePath = app.$getReturnTo(returnTo);
      return app.$gotoPage(pagePath, {
        replace: true
      });
    };
    app.$getReturnTo = (returnTo) => {
      const pagePath = returnTo ?? cast(app.meta.$router.currentRoute)?.query?.[app.sys.env.ROUTER_KEY_RETURNTO] ?? app.sys.env.ROUTER_PAGE_HOME;
      return pagePath;
    };
    app.$getCurrentPagePath = () => {
      return cast(app.meta.$router.currentRoute)?.fullPath;
    };
  }
}
var _dec, _dec2, _class;
const components = {
  "routerViewEmpty": ZRouterViewEmpty
};
let ScopeModuleARouter = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-router"
}), _dec(_class = _dec2(_class = class ScopeModuleARouter2 extends BeanScopeBase {
}) || _class) || _class);
export {
  BeanRouter,
  BeanRouterGuardsBase,
  BeanRouterViewBase,
  ControllerRouterViewEmpty,
  ModelPageData,
  Monkey,
  MonkeySys,
  NavigationDirection,
  NavigationType,
  ScopeModuleARouter,
  ServiceRouterGuards,
  SymbolRouterHistory,
  SysRouter,
  ZRouterViewEmpty,
  components,
  config,
  getCurrentRoute,
  getPageRoute,
  getRealRouteName,
  getRouteMatched,
  isRouterName,
  pageRouteKey,
  routerViewKey,
  scrollBehavior
};
