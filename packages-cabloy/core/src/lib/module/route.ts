import is from 'is-type-of';
import extend from '@zhennann/extend';
import pathMatching from 'egg-path-matching';
import loadMiddlewares from './middleware.js';
import { CabloyApplication, CabloyContext } from '../../types/index.js';
import { BeanSimple } from './bean/beanSimple.js';
const MWSTATUS = Symbol('Context#__wmstatus');

export class AppRouter extends BeanSimple {
  register(info, route) {
    const app = this.app;
    // args
    const args = [] as any;
    // name
    if (route.name) args.push(route.name);
    // path
    args.push(typeof route.path === 'string' ? app.meta.util.combineFetchPath(info, route.path) : route.path);

    // constroller
    let controllerBeanFullName;
    let _route;
    if (route.controller) {
      if (is.function(route.controller)) {
        throw new Error(`Controller should be bean: ${info.relativeName}.${route.controller(app).name}`);
      }
      if (typeof route.controller === 'string') {
        controllerBeanFullName = `${info.relativeName}.controller.${route.controller}`;
      } else {
        controllerBeanFullName = `${route.controller.module || info.relativeName}.controller.${route.controller.name}`;
      }
      // _route
      _route = {
        pid: info.pid,
        module: info.name,
        controller: route.controller,
        action: route.action || route.path.substr(route.path.lastIndexOf('/') + 1),
      };
    }

    // middlewares: start
    const fnStart = async (ctx, next) => {
      // status
      ctx[MWSTATUS] = {};
      // route
      ctx.route = _route;
      // dynamic options
      ctx.meta.middlewares = {};
      // getMiddlewareOptions
      ctx.meta.getMiddlewareOptions = function (middlewareName) {
        const item = app.meta.middlewaresNormal[middlewareName];
        // config options
        const config = ctx.config.module(item.module);
        const optionsConfig = config.middlewares ? config.middlewares[item.name] : null;
        // route options
        const optionsRoute = route.meta ? route.meta[item.name] : null;
        // dynamic options
        const optionsDynamic = ctx.meta.middlewares[item.name];
        // final options
        const options = extend(true, {}, optionsConfig, optionsRoute, optionsDynamic);
        // ok
        return options;
      };
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

    // middlewares: route
    if (route.middlewares) {
      let middlewares = route.middlewares;
      if (is.string(middlewares)) middlewares = middlewares.split(',');
      middlewares.forEach(key => {
        if (is.string(key)) {
          const item = app.meta.middlewaresNormal[key];
          if (item) {
            args.push(wrapMiddleware(item));
          } else {
            args.push(wrapMiddlewareApp(key, route, app));
          }
        } else {
          args.push(key);
        }
      });
    }

    // controller
    if (route.controller) {
      // middleware controller
      args.push(methodToMiddleware(controllerBeanFullName, _route));
    }

    // load
    app.router[route.method](...args);
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
}

export default function (app: CabloyApplication, modules) {
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
    Object.keys(modules).forEach(key => {
      const module = modules[key];

      // routes and controllers
      const routes = module.main.routes;
      if (routes) {
        routes.forEach(route => {
          app.meta.router.register(module.info, route);
        });
      }
    });
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
  return function classControllerMiddleware(this: CabloyContext, ...args) {
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
