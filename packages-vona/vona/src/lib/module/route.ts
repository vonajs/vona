import is from 'is-type-of';
import pathMatching from 'egg-path-matching';
import * as ModuleInfo from '@cabloy/module-info';
import loadMiddlewares from './middleware.js';
import { VonaApplication, VonaContext, Cast, IModule, IMiddlewareItem } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { IModuleRoute } from '../bean/index.js';
import { appResource } from '../core/resource.js';
import { Constructable } from '../decorator/type/constructable.js';
import {
  IDecoratorControllerOptions,
  SymbolUseMiddlewareLocal,
  SymbolUseMiddlewareOptions,
} from '../decorator/index.js';
import { METHOD_METADATA, PATH_METADATA } from '../web/constants.js';
import { appMetadata } from '../core/metadata.js';
import { extend } from '@cabloy/extend';
const MWSTATUS = Symbol('Context#__wmstatus');

export class AppRouter extends BeanSimple {
  register(info: ModuleInfo.IModuleInfo | string, route: IModuleRoute) {
    // info
    if (typeof info === 'string') {
      info = ModuleInfo.parseInfo(info)!;
    }
    // app
    const app = this.app;

    // path
    const routePath =
      typeof route.path === 'string' ? app.meta.util.combineFetchPath(info, route.path, false) : route.path;

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
      middlewaresLocal.push(controllerActionToMiddleware(_route.controllerBeanFullName, _route));
    }

    // register
    this._registerInner(_route, middlewaresLocal);
  }

  unRegister(name) {
    const app = this.app;
    const index = app.router.stack.findIndex(layer => layer.name && layer.name === name);
    if (index > -1) app.router.stack.splice(index, 1);
  }

  findByPath(moduleName: ModuleInfo.IModuleInfo | string, path: string | undefined, simplify: boolean): any {
    const app = this.app;
    const _path = app.meta.util.combineFetchPath(moduleName, path, simplify);
    return app.router.stack.find(layer => layer.path === _path);
  }

  registerController(info: ModuleInfo.IModuleInfo | string, controller: Constructable) {
    // info
    if (typeof info === 'string') {
      info = ModuleInfo.parseInfo(info)!;
    }
    // controller options
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) return;
    const controllerBeanFullName = beanOptions.beanFullName;
    const controllerOptions = beanOptions.options as IDecoratorControllerOptions;
    const controllerPath = controllerOptions.path;
    const controllerMiddlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, controller);
    const controllerMiddlewaresLocal = appMetadata.getOwnMetadataArray(SymbolUseMiddlewareLocal, controller);
    // descs
    const descs = Object.getOwnPropertyDescriptors(controller.prototype);
    for (const actionKey in descs) {
      const desc = descs[actionKey];
      if (['constructor'].includes(actionKey)) continue;
      if (!desc.value || typeof desc.value !== 'function') continue;
      this._registerControllerAction(
        info,
        controller,
        controllerBeanFullName,
        controllerPath,
        controllerMiddlewaresOptions,
        controllerMiddlewaresLocal,
        actionKey,
        desc,
      );
    }
  }

  _registerControllerAction(
    info: ModuleInfo.IModuleInfo,
    controller: Constructable,
    controllerBeanFullName: string,
    controllerPath: string | undefined,
    controllerMiddlewaresOptions: object,
    controllerMiddlewaresLocal: any[],
    actionKey: string,
    desc: PropertyDescriptor,
  ) {
    // app
    const app = this.app;

    // actionPath/actionMethod
    if (!Reflect.hasOwnMetadata(PATH_METADATA, desc.value)) return;
    const actionPath: RegExp | string = Reflect.getMetadata(PATH_METADATA, desc.value) || '';
    const actionMethod: string = Reflect.getMetadata(METHOD_METADATA, desc.value);
    // routePath
    let routePath: RegExp | string;
    if (typeof actionPath !== 'string') {
      // regexp
      routePath = actionPath;
    } else if (actionPath.startsWith('/')) {
      // absolute
      routePath = app.meta.util.combineFetchPath(info, actionPath, true);
    } else {
      // relative
      if (!controllerPath) {
        routePath = app.meta.util.combineFetchPath(info, actionPath, true);
      } else {
        routePath = app.meta.util.combineFetchPath(info, controllerPath, true);
        if (actionPath) {
          routePath = `${routePath}/${actionPath}`;
        }
      }
    }

    // middlewares options
    const actionMiddlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, desc.value);

    // route
    const route = {
      meta: extend(true, {}, controllerMiddlewaresOptions, actionMiddlewaresOptions),
    };

    // route
    const _route = {
      pid: info.pid,
      module: info.name,
      controller,
      actionDescriptor: desc,
      controllerBeanFullName,
      action: actionKey,
      route: route,
      routeName: undefined,
      routeMethod: actionMethod,
      routePath,
    };

    // middlewaresLocal: route
    const middlewaresLocal: any[] = [];
    const actionMiddlewaresLocal = appMetadata.getOwnMetadataArray<string>(SymbolUseMiddlewareLocal, desc.value);
    const middlewaresLocalAll: string[] = [];
    actionMiddlewaresLocal.forEach(item => {
      if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
    });
    controllerMiddlewaresLocal.forEach(item => {
      if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
    });
    for (const middlewareName of middlewaresLocalAll) {
      const item = app.meta.middlewaresNormal[middlewareName];
      if (!item) throw new Error(`middleware not found: ${middlewareName}`);
      middlewaresLocal.push(wrapMiddleware(item));
    }

    // middleware controller
    middlewaresLocal.push(controllerActionToMiddleware(_route.controllerBeanFullName, _route));

    // register
    this._registerInner(_route, middlewaresLocal);
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
      const controllers = appResource.scenes['controller'][key];
      if (controllers) {
        for (const key in controllers) {
          app.meta.router.registerController(module.info, controllers[key].beanClass);
        }
      }
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

function wrapMiddleware(item: IMiddlewareItem) {
  const fn = (ctx, next) => {
    // options
    const options = ctx.meta.getMiddlewareOptions(item);
    // enable match ignore dependencies
    if (options.enable === false || !middlewareMatch(ctx, options) || !middlewareDeps(ctx, options)) {
      ctx[MWSTATUS][item.name] = false;
      return next();
    }
    // execute
    const beanFullName = item.beanOptions.beanFullName;
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

function controllerActionToMiddleware(controllerBeanFullName, _route) {
  return async function classControllerMiddleware(this: VonaContext, ...args) {
    const controller = this.bean._getBean(controllerBeanFullName);
    if (!controller) {
      throw new Error(`controller not found: ${controllerBeanFullName}`);
    }
    if (!controller[_route.action]) {
      throw new Error(`controller action not found: ${controllerBeanFullName}.${_route.action}`);
    }
    const res = await controller[_route.action](...args);
    if (this.response.body === undefined && res !== undefined) {
      this.success(res);
    }
  };
}
