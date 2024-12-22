import { Bean } from 'vona-module-a-bean';
import { appMetadata, appResource, BeanBase, Constructable, deepExtend, Next, VonaContext } from 'vona';
import * as ModuleInfo from '@cabloy/module-info';
import { IDecoratorControllerOptions } from '../types/controller.js';
import { middlewareGuard } from '../lib/middleware/middlewareGuard.js';
import { middlewareInterceptor } from '../lib/middleware/middlewareInterceptor.js';
import { middlewarePipe } from '../lib/middleware/middlewarePipe.js';
import { SymbolRouteHandlersArgumentsValue } from 'vona-module-a-openapi';
import { SymbolUseOnionOptions } from 'vona-module-a-onion';
import { RequestMethod, SymbolRequestMappingHandler } from '../types/request.js';
import { RequestMappingMetadata } from '../lib/decorator/request.js';

@Bean()
export class BeanRouter extends BeanBase {
  // todo: maybe need for no controller
  register() {}

  registerController(moduleName: string, controller: Constructable) {
    // info
    const info = ModuleInfo.parseInfo(moduleName)!;
    // controller options
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) return;
    const controllerBeanFullName = beanOptions.beanFullName;
    const controllerOptions = beanOptions.options as IDecoratorControllerOptions;
    const controllerPath = controllerOptions.path;
    const controllerMiddlewaresOptions = appMetadata.getMetadata<object>(SymbolUseOnionOptions, controller);
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

  private _registerControllerAction(
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
    const routePath = app.meta.util.combineApiPathControllerAndAction(
      info.relativeName,
      controllerPath,
      actionPath,
      true,
      true,
    );
    const routePathRaw = app.meta.util.combineApiPathControllerAndActionRaw(
      info.relativeName,
      controllerPath,
      actionPath,
      true,
    );

    // middlewares options
    const actionMiddlewaresOptions = appMetadata.getMetadata(SymbolUseOnionOptions, controller.prototype, actionKey);

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
      routePathRaw,
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
    return this.app.bean.onion.middleware.compose(ctx, fnStart, fnMid, fnEnd);
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
    args.push(...app.bean.onion.middleware.composedOnionsGlobal);
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
