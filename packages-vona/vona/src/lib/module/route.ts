import is from 'is-type-of';
import pathMatching from 'egg-path-matching';
import * as ModuleInfo from '@cabloy/module-info';
import {
  VonaApplication,
  VonaContext,
  cast,
  IModule,
  IMiddlewareItem,
  SymbolUseMiddlewareOptions,
  SymbolRouteHandlersArgumentsValue,
  Next,
  IDecoratorControllerOptions,
} from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { IModuleRoute } from '../bean/index.js';
import { appResource } from '../core/resource.js';
import { Constructable } from '../decorator/type/constructable.js';
import { appMetadata } from '../core/metadata.js';
import { middlewareGuard } from './middleware/middlewareGuard.js';
import { middlewareInterceptor } from './middleware/middlewareInterceptor.js';
import { middlewarePipe } from './middleware/middlewarePipe.js';
import { deepExtend } from '../utils/util.js';
import { SymbolRequestMappingHandler } from '../web/constants.js';
import { RequestMappingMetadata } from '../web/decorator/http/requestMapping.js';
import { RequestMethod } from '../web/enum/requestMethod.js';

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // patch router
  patchRouter();

  // load routes
  loadRoutes();

  function patchRouter() {
    app.meta.router = app.bean._newBean(AppRouter);
  }

  function loadRoutes() {
    // todo: remove: load routes from config
    for (const key in modules) {
      const module = modules[key];
      // routes
      const routes = module.resource.routes;
      if (routes) {
        for (const route of routes) {
          app.meta.router.register(module.info, route);
        }
      }
    }
    // controllers by decorator
    for (const controller of app.meta.onionController.middlewaresEnabled) {
      app.meta.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
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
