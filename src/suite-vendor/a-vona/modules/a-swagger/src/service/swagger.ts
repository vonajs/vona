import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { OpenAPIObject } from 'openapi3-ts/oas30';
import { appMetadata, appResource, BeanBase, Constructable } from 'vona';
import { IDecoratorControllerOptions, Service } from 'vona-module-a-web';
import * as ModuleInfo from '@cabloy/module-info';
import { SymbolUseOnionOptions } from 'vona-module-a-onion';

@Service()
export class ServiceSwagger extends BeanBase {
  generateJson(): OpenAPIObject {
    const registry = this._collectRegistry();
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument(this.scope.config.generateDocument);
  }

  private _collectRegistry() {
    const registry = new OpenAPIRegistry();
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this._collectController(registry, controller.beanOptions.module, controller.beanOptions.beanClass);
    }
    return registry;
  }

  private _collectController(registry: OpenAPIRegistry, moduleName: string, controller: Constructable) {
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
        registry,
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

  private _registerControllerAction(
    registry: OpenAPIRegistry,
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
}
