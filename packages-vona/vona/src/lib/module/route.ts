import is from 'is-type-of';
import pathMatching from 'egg-path-matching';
import * as ModuleInfo from '@cabloy/module-info';
import loadMiddlewares from './middleware.js';
import { VonaApplication, VonaContext, Cast, IModule } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { IModuleRoute } from '../bean/index.js';
const MWSTATUS = Symbol('Context#__wmstatus');

export class AppRouter extends BeanSimple {
  register(info, route: IModuleRoute) {
    // info
    if (typeof info === 'string') {
      info = ModuleInfo.parseInfo(info);
    }
    // app
    const app = this.app;

    // path
    const routePath = typeof route.path === 'string' ? app.meta.util.combineFetchPath(info, route.path) : route.path;

    // route
    const _route = {
      pid: info.pid,
      module: info.name,
      controller: route.controller,
      controllerBeanFullName: '',
      action: '',
      route,
      routeName: route.name,
      routeMethod: route.method,
      routePath,
    };
    // constroller
    if (route.controller) {
      if (is.function(route.controller)) {
        throw new Error(`Controller should be bean: ${info.relativeName}.${Cast(route.controller)(app).name}`);
      }
      let controllerBeanFullName;
      if (typeof route.controller === 'string') {
        controllerBeanFullName = `${info.relativeName}.controller.${route.controller}`;
      } else {
        controllerBeanFullName = `${route.controller.module || info.relativeName}.controller.${route.controller.name}`;
      }
      _route.controllerBeanFullName = controllerBeanFullName;
    }
    // action
    let action = route.action;
    if (!action && typeof route.path === 'string') {
      action = route.path.substring(route.path.lastIndexOf('/') + 1);
    }
    _route.action = action || '';

    // middlewaresLocal: route
    const middlewaresLocal: any[] = [];
    if (route.middlewares) {
      let middlewares = route.middlewares;
      if (typeof middlewares === 'string') middlewares = middlewares.split(',');
      middlewares.forEach(key => {
        if (is.string(key)) {
          const item = app.meta.middlewaresNormal[key];
          if (item) {
            middlewaresLocal.push(wrapMiddleware(item));
          } else {
            middlewaresLocal.push(wrapMiddlewareApp(key, route, app));
          }
        } else {
          middlewaresLocal.push(key);
        }
      });
    }

    // controller
    if (route.controller) {
      // middleware controller
      middlewaresLocal.push(methodToMiddleware(_route.controllerBeanFullName, _route));
    }

    // register
    this._registerInner(_route, middlewaresLocal);
  }

  unRegister(name) {
    const app = this.app;
    const index = app.router.stack.findIndex(layer => layer.name && layer.name === name);
    if (index > -1) app.router.stack.splice(index, 1);
  }

  findByPath(moduleName, arg): any {
    const app = this.app;
    const path = app.meta.util.combineFetchPath(moduleName, arg);
    return app.router.stack.find(layer => layer.path === path);
  }

  _registerInner(route, middlewaresLocal) {
    // app
    const app = this.app;
    // args
    let args: any[] = [];
    // middlewares: start
    const fnStart = async (ctx, next) => {
      // status
      ctx[MWSTATUS] = {};
      // route
      ctx.route = route;
      // dynamic options
      ctx.meta.middlewares = {};
      // next
      await next();
      // invoke callbackes: handle secondly
      await ctx.tailDone();
    };
    fnStart._name = 'start';
    args.push(fnStart);

    // middlewares: globals
    app.meta.middlewaresGlobal.forEach(item => {
      args.push(wrapMiddleware(item));
    });

    // middlewares: tailDone
    const fnTailDone = async (ctx, next) => {
      // next
      await next();
      // invoke callbackes: handle firstly
      await ctx.tailDone();
    };
    fnStart._name = 'tailDone';
    args.push(fnTailDone);

    // middlewares
    if (middlewaresLocal.length > 0) {
      args = args.concat(middlewaresLocal);
    }

    // load
    if (route.routeName) {
      app.router[route.routeMethod](route.routeName, route.routePath, ...args);
    } else {
      app.router[route.routeMethod](route.routePath, ...args);
    }
  }
}

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // load middlewares
  loadMiddlewares(app);

  // patch router
  patchRouter();

  // load routes
  loadRoutes();

  function patchRouter() {
    app.meta.router = app.bean._newBean(AppRouter);
  }

  function loadRoutes() {
    // load routes
    for (const key in modules) {
      const module = modules[key];
      // routes
      const routes = module.resource.routes;
      if (routes) {
        for (const route of routes) {
          app.meta.router.register(module.info, route);
        }
      }
      // controllers by decorator
      const controllers = module.resource.controllers;
      console.log(controllers.length);
    }
  }
}

function wrapMiddlewareApp(key, route, app) {
  try {
    const middleware = app.middlewares[key];
    const optionsRoute = route.meta ? route.meta[key] : null;
    const mw = middleware(optionsRoute, app);
    mw._name = key;
    return mw;
  } catch (err) {
    console.log(`\nmiddleware error: ${key}\n`);
    throw err;
  }
}

function wrapMiddleware(item) {
  const fn = (ctx, next) => {
    // options
    const options = ctx.meta.getMiddlewareOptions(item.name);
    // enable match ignore dependencies
    if (options.enable === false || !middlewareMatch(ctx, options) || !middlewareDeps(ctx, options)) {
      ctx[MWSTATUS][item.name] = false;
      return next();
    }
    // bean
    const bean = item.bean;
    // execute
    const beanFullName = `${bean.module}.middleware.${bean.name}`;
    const beanInstance = ctx.bean._getBean(beanFullName);
    if (!beanInstance) {
      throw new Error(`middleware bean not found: ${beanFullName}`);
    }
    return beanInstance.execute(options, next);
  };
  fn._name = item.name;
  return fn;
}

function middlewareMatch(ctx, options) {
  if (!options.match && !options.ignore) {
    return true;
  }
  const match = pathMatching(options);
  return match(ctx);
}

function middlewareDeps(ctx, options) {
  let deps = options.dependencies || [];
  if (typeof deps === 'string') deps = deps.split(',');
  return deps.every(key => ctx[MWSTATUS][key] !== false);
}

function methodToMiddleware(controllerBeanFullName, _route) {
  return function classControllerMiddleware(this: VonaContext, ...args) {
    const controller = this.bean._getBean(controllerBeanFullName);
    if (!controller) {
      throw new Error(`controller not found: ${controllerBeanFullName}`);
    }
    if (!controller[_route.action]) {
      throw new Error(`controller action not found: ${controllerBeanFullName}.${_route.action}`);
    }
    return controller[_route.action](...args);
  };
}
