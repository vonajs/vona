import {
  appMetadata,
  appResource,
  Bean,
  BeanBase,
  cast,
  Constructable,
  deepExtend,
  IMiddlewareItem,
  IModuleRoute,
  Next,
  RequestMappingMetadata,
  RequestMethod,
  SymbolRequestMappingHandler,
  SymbolRouteHandlersArgumentsValue,
  SymbolUseMiddlewareOptions,
  VonaContext,
} from 'vona';
import is from 'is-type-of';
import pathMatching from 'egg-path-matching';
import * as ModuleInfo from '@cabloy/module-info';
import { IDecoratorControllerOptions } from '../types/controller.js';
import { middlewareGuard } from '../lib/middleware/middlewareGuard.js';
import { middlewareInterceptor } from '../lib/middleware/middlewareInterceptor.js';
import { middlewarePipe } from '../lib/middleware/middlewarePipe.js';

@Bean()
export class BeanRouter extends BeanBase {
  register(info: ModuleInfo.IModuleInfo | string, route: IModuleRoute) {
    // info
    if (typeof info === 'string') {
      info = ModuleInfo.parseInfo(info)!;
    }
    // app
    const app = this.app;

    // path
    const routePath =
      typeof route.path === 'string' ? app.meta.util.combineApiPath(info, route.path, true, false) : route.path;

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
    // controller
    if (route.controller) {
      if (is.function(route.controller)) {
        throw new Error(`Controller should be bean: ${info.relativeName}.${cast(route.controller)(app).name}`);
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
          const item = app.meta.onionMiddleware.middlewaresNormal[key];
          if (item) {
            middlewaresLocal.push(wrapMiddleware('middleware', item));
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
    const _path = app.meta.util.combineApiPath(moduleName, path, true, simplify);
    return app.router.stack.find(layer => layer.path === _path);
  }

  registerController(moduleName: string, controller: Constructable) {
    // info
    const info = ModuleInfo.parseInfo(moduleName)!;
    // controller options
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) return;
    const controllerBeanFullName = beanOptions.beanFullName;
    const controllerOptions = beanOptions.options as IDecoratorControllerOptions;
    const controllerPath = controllerOptions.path;
    const controllerMiddlewaresOptions = appMetadata.getMetadata<object>(SymbolUseMiddlewareOptions, controller);
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
    controllerMiddlewaresOptions: object | undefined,
    actionKey: string,
    desc: PropertyDescriptor,
  ) {
    // app
    const app = this.app;

    // actionPath/actionMethod
    if (!appMetadata.hasMetadata(SymbolRequestMappingHandler, controller.prototype, actionKey)) return;
    const handlerMetadata = appMetadata.getMetadata<RequestMappingMetadata>(
      SymbolRequestMappingHandler,
      controller.prototype,
      actionKey,
    )!;
    const actionPath: RegExp | string = handlerMetadata.path || '';
    const actionMethod: string = handlerMetadata.method || RequestMethod.GET;
    // routePath
    let routePath: RegExp | string;
    if (typeof actionPath !== 'string') {
      // regexp
      routePath = actionPath;
    } else if (actionPath.startsWith('/')) {
      // absolute
      routePath = app.meta.util.combineApiPath(info, actionPath, true, true);
    } else {
      // relative
      if (!controllerPath) {
        routePath = app.meta.util.combineApiPath(info, actionPath, true, true);
      } else {
        routePath = app.meta.util.combineApiPath(info, controllerPath, true, true);
        if (actionPath) {
          routePath = `${routePath}/${actionPath}`;
        }
      }
    }

    // middlewares options
    const actionMiddlewaresOptions = appMetadata.getMetadata(
      SymbolUseMiddlewareOptions,
      controller.prototype,
      actionKey,
    );

    // route
    const route = {
      meta: deepExtend({}, controllerMiddlewaresOptions, actionMiddlewaresOptions),
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

    // fn
    const fn = (ctx, next) => {
      ctx.route = _route;
      return this._registerComposeMiddlewares(ctx)(ctx, next);
    };

    // register
    if (_route.routeName) {
      app.router[_route.routeMethod](_route.routeName, _route.routePath, fn);
    } else {
      app.router[_route.routeMethod](_route.routePath, fn);
    }
  }

  _registerComposeMiddlewares(ctx: VonaContext) {
    // start
    const fnStart = routeStartMiddleware;
    // mid: guard/interceptor/pipes/tail
    const fnMid: Function[] = [];
    fnMid.push(middlewareGuard);
    fnMid.push(middlewareInterceptor);
    fnMid.push(middlewarePipe);
    fnMid.push(routeTailDoneMiddleware);
    // end: controller
    const fnEnd = classControllerMiddleware;
    // compose
    return this.app.meta.onionMiddleware.composeAsync(ctx, fnStart, fnMid, fnEnd);
  }

  _registerInner(route, middlewaresLocal) {
    // app
    const app = this.app;
    // args
    let args: any[] = [];
    // middlewares: start
    const fnStart = async (ctx: VonaContext, next: Next) => {
      // route
      ctx.route = route;
      // next
      const res = await next();
      // invoke callbackes: handle secondly
      await ctx.tailDone();
      // ok
      return res;
    };
    fnStart._name = 'start';
    args.push(fnStart);

    // middlewares: globals
    app.meta.onionMiddleware.middlewaresGlobal.forEach(item => {
      args.push(wrapMiddleware('middleware', item));
    });
    // middlewares: guard/interceptor/pipes
    args.push(middlewareGuard);
    args.push(middlewareInterceptor);
    args.push(middlewarePipe);

    // middlewares: tailDone
    const fnTailDone = async (ctx, next) => {
      // next
      const res = await next();
      // invoke callbackes: handle firstly
      await ctx.tailDone();
      // ok
      return res;
    };
    fnTailDone._name = 'tailDone';
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

function wrapMiddleware(_sceneName: string, item: IMiddlewareItem) {
  const fn = (ctx, next) => {
    // options
    const options = ctx.meta.getMiddlewareOptions(item.name);
    // enable match ignore dependencies
    if (options.enable === false || !middlewareMatch(ctx, options)) {
      return next();
    }
    // execute
    const beanFullName = item.beanOptions.beanFullName;
    const beanInstance = ctx.app.bean._getBean(beanFullName);
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

function controllerActionToMiddleware(controllerBeanFullName, _route) {
  return function classControllerMiddleware(ctx: VonaContext) {
    const controller = ctx.app.bean._getBean(controllerBeanFullName);
    if (!controller) {
      throw new Error(`controller not found: ${controllerBeanFullName}`);
    }
    if (!controller[_route.action]) {
      throw new Error(`controller action not found: ${controllerBeanFullName}.${_route.action}`);
    }
    return controller[_route.action](...(ctx[SymbolRouteHandlersArgumentsValue] || []));
  };
}

function classControllerMiddleware(ctx: VonaContext) {
  const beanFullName = ctx.getClassBeanFullName();
  const handlerName = ctx.getHandler()!.name;
  const controller = ctx.app.bean._getBean(beanFullName as any) as any;
  return controller[handlerName](...(ctx[SymbolRouteHandlersArgumentsValue] || []));
}

async function routeStartMiddleware(ctx: VonaContext, next: Function) {
  // next
  const res = await next();
  // invoke callbackes: handle secondly
  await ctx.tailDone();
  // ok
  return res;
}

async function routeTailDoneMiddleware(ctx: VonaContext, next: Function) {
  // next
  const res = await next();
  // invoke callbackes: handle firstly
  await ctx.tailDone();
  // ok
  return res;
}
