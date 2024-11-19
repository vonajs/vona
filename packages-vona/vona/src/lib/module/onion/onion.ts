import { swapDeps } from '@cabloy/deps';
import pathMatching from 'egg-path-matching';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IDecoratorMiddlewareOptionsGlobal,
  IMiddlewareItem,
  SymboleMiddlewareStatus,
  SymbolUseMiddlewareLocal,
} from '../../../types/interface/middleware.js';
import { RouteHandlerArgumentMetaDecorator } from '../../../types/interface/pipe.js';
import { appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { VonaContext } from '../../../types/context/index.js';
import { Cast } from '../../../types/utils/cast.js';
import { IModule } from '@cabloy/module-info';
import { onionScenesMeta, OnionSceneMeta } from './meta.js';
import { extend } from '@cabloy/extend';

const __adapter = (_context, chain) => {
  return {
    receiver: undefined,
    fn: chain,
  };
};

export class Onion extends BeanSimple {
  sceneName: string;
  sceneMeta: OnionSceneMeta;
  middlewaresNormal: Record<string, IMiddlewareItem>;
  middlewaresGlobal: IMiddlewareItem[];

  _cacheMiddlewaresOptions: Record<string, IDecoratorMiddlewareOptionsGlobal> = {};

  _cacheMiddlewaresGlobal: Function[];
  _cacheMiddlewaresHandler: Record<string, Function[]> = {};
  _cacheMiddlewaresArgument: Record<string, Function[]> = {};

  protected __init__(sceneName: string) {
    this.sceneName = sceneName;
    this.sceneMeta = onionScenesMeta[this.sceneName];
    this._loadMiddlewares();
    this._handleDependents(this.middlewaresGlobal);
    this._swapMiddlewares(this.middlewaresGlobal);
  }

  composeAsync(
    ctx: VonaContext,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
  ) {
    // compose
    const middlewares = this._composeMiddlewaresHandler(ctx, fnStart, fnMid, fnEnd);
    // invoke
    return ctx.app.meta.util.composeAsync(middlewares, __adapter);
  }

  composeSocketAsync() {
    return this._composeMiddlewaresGlobal();
  }

  composePipes(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator, executeCustom: Function) {
    const beanFullName = ctx.getClassBeanFullName();
    const handlerName = ctx.getHandler().name;
    const key = `${beanFullName}:${handlerName}:${argMeta.index}`;
    if (!this._cacheMiddlewaresArgument[key]) {
      const middlewares: Function[] = [];
      // pipes: global
      for (const item of this.middlewaresGlobal) {
        middlewares.push(this._wrapMiddleware(item, executeCustom));
      }
      // pipes: route
      const middlewaresLocal = this._collectMiddlewaresHandler(ctx);
      for (const item of middlewaresLocal) {
        middlewares.push(this._wrapMiddleware(item, executeCustom));
      }
      // pipes: arguments
      const middlewaresArgument = this._collectArgumentMiddlewares(ctx, argMeta);
      if (middlewaresArgument) {
        for (const item of middlewaresArgument) {
          middlewares.push(this._wrapMiddleware(item, executeCustom));
        }
      }
      this._cacheMiddlewaresArgument[key] = middlewares;
    }
    return this._cacheMiddlewaresArgument[key];
  }

  private _composeMiddlewaresGlobal() {
    if (!this._cacheMiddlewaresGlobal) {
      const middlewares: Function[] = [];
      for (const item of this.middlewaresGlobal) {
        middlewares.push(this._wrapMiddleware(item));
      }
      this._cacheMiddlewaresGlobal = middlewares;
    }
    return this._cacheMiddlewaresGlobal;
  }

  private _collectArgumentMiddlewares(_ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
    if (!argMeta.pipes) return;
    return argMeta.pipes.map(pipe => {
      const { pipeName, options, optionsPrimitive } = pipe();
      const item = this.middlewaresNormal[pipeName];
      if (!item) throw new Error(`${this.sceneName} not found: ${pipeName}`);
      return { ...item, pipeOptions: options, pipeOptionsPrimitive: optionsPrimitive };
    });
  }

  private _composeMiddlewaresHandler(
    ctx: VonaContext,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
  ) {
    const beanFullName = ctx.getClassBeanFullName();
    const handlerName = ctx.getHandler().name;
    const key = `${beanFullName}:${handlerName}`;
    if (!this._cacheMiddlewaresHandler[key]) {
      let middlewares: Function[] = [];
      if (fnStart) middlewares = middlewares.concat(fnStart);
      // middlewares: global
      middlewares = middlewares.concat(this._composeMiddlewaresGlobal());
      if (fnMid) middlewares = middlewares.concat(fnMid);
      // middlewares: handler
      const middlewaresLocal = this._collectMiddlewaresHandler(ctx);
      for (const item of middlewaresLocal) {
        middlewares.push(this._wrapMiddleware(item));
      }
      if (fnEnd) middlewares = middlewares.concat(fnEnd);
      this._cacheMiddlewaresHandler[key] = middlewares;
    }
    return this._cacheMiddlewaresHandler[key];
  }

  private _collectMiddlewaresHandler(ctx: VonaContext) {
    // middlewaresLocal: controller
    const controllerMiddlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, ctx.getClass())[
      this.sceneName
    ] as string[];
    // middlewaresLocal: action
    const middlewaresLocal: IMiddlewareItem[] = [];
    const actionMiddlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, ctx.getHandler())[
      this.sceneName
    ] as string[];
    const middlewaresLocalAll: string[] = [];
    if (actionMiddlewaresLocal) {
      actionMiddlewaresLocal.forEach(item => {
        if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
      });
    }
    if (controllerMiddlewaresLocal) {
      controllerMiddlewaresLocal.forEach(item => {
        if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
      });
    }
    for (const middlewareName of middlewaresLocalAll) {
      const item = this.middlewaresNormal[middlewareName];
      if (!item) throw new Error(`${this.sceneName} not found: ${middlewareName}`);
      middlewaresLocal.push(item);
    }
    return middlewaresLocal;
  }

  private _getMiddlewareOptions(item: IMiddlewareItem, optionsPrimitive?: boolean) {
    if (!this._cacheMiddlewaresOptions[item.name]) {
      // options: meta
      const optionsMeta = item.options;
      // options: config
      let optionsConfig;
      if (item.fromConfig) {
        const config = this.app.config.modules[item.beanOptions.module];
        optionsConfig = config?.middlewares?.[item.name];
      } else {
        optionsConfig = this.app.config.metadata[item.beanOptions.scene]?.[item.name];
      }
      if (optionsPrimitive) {
        this._cacheMiddlewaresOptions[item.name] = optionsConfig ?? optionsMeta;
      } else {
        this._cacheMiddlewaresOptions[item.name] = extend(true, {}, optionsMeta, optionsConfig);
      }
    }
    return this._cacheMiddlewaresOptions[item.name];
  }

  getMiddlewareItem(middlewareName: string): IMiddlewareItem {
    return this.middlewaresNormal[middlewareName];
  }

  combineMiddlewareOptions(ctx: VonaContext, item: IMiddlewareItem) {
    // optionsPrimitive
    const optionsPrimitive = item.pipeOptionsPrimitive;
    // options: meta/config
    const optionsMetaAndConfig = this._getMiddlewareOptions(item, optionsPrimitive);
    // options: instance config
    const optionsInstanceConfig = ctx.instance ? ctx.config.metadata[item.beanOptions.scene]?.[item.name] : undefined;
    // options: route
    let optionsRoute;
    if (this.sceneMeta.optionsRoute) {
      const route = ctx.route.route;
      optionsRoute = route.meta?.[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    }
    // options: argument pipe
    const optionsPipe = this.sceneMeta.optionsPipe ? item.pipeOptions : undefined;
    // options: dynamic
    let optionsDynamic;
    if (this.sceneMeta.optionsDynamic) {
      optionsDynamic = ctx.meta.middlewares[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    }
    // final options
    let options;
    if (optionsPrimitive) {
      options = optionsDynamic ?? optionsPipe ?? optionsRoute ?? optionsInstanceConfig ?? optionsMetaAndConfig;
    } else {
      options = extend(
        true,
        {},
        optionsMetaAndConfig,
        optionsInstanceConfig,
        optionsRoute,
        optionsPipe,
        optionsDynamic,
      );
    }
    // ok
    return options;
  }

  private _handleDependents(middlewares: IMiddlewareItem[]) {
    for (const middleware of middlewares) {
      const middlewareOptions = this._getMiddlewareOptions(middleware);
      let dependents = middlewareOptions.dependents as any;
      if (!dependents) continue;
      if (!Array.isArray(dependents)) {
        dependents = dependents.split(',') as any[];
      }
      for (const dep of dependents!) {
        const middleware2 = middlewares.find(item => item.name === dep);
        if (!middleware2) {
          throw new Error(`${this.sceneName} ${dep} not found for dependents of ${middleware.name}`);
        }
        const options = this._getMiddlewareOptions(middleware2) as any;
        if (!options.dependencies) options.dependencies = [];
        if (!Array.isArray(options.dependencies)) {
          options.dependencies = options.dependencies.split(',') as any[];
        }
        if (options.dependencies.findIndex(item => item === middleware.name) === -1) {
          options.dependencies.push(middleware.name as any);
        }
      }
    }
  }

  private _swapMiddlewares(middlewares: IMiddlewareItem[]) {
    swapDeps(middlewares, {
      name: 'name',
      dependencies: item => {
        const middlewareOptions = this._getMiddlewareOptions(item as any);
        return middlewareOptions.dependencies as any;
      },
    });
  }

  private _loadMiddlewares() {
    const middlewaresAll = this._loadMiddlewaresAll();
    this.middlewaresNormal = {};
    this.middlewaresGlobal = [];
    // load
    for (const item of middlewaresAll) {
      // normal
      this.middlewaresNormal[item.name] = item;
      // global
      if (!this.sceneMeta.hasLocal || item.options?.global) {
        this.middlewaresGlobal.push(item);
      }
    }
  }

  private _loadMiddlewaresAll() {
    const middlewaresAll: IMiddlewareItem[] = [];
    for (const module of this.app.meta.modulesArray) {
      // todo: should be removed
      if (this.sceneName === 'middleware') {
        this._loadMiddlewaresAll_fromConfig(middlewaresAll, module);
      }
      // todo: remove this line
      if (this.sceneName !== 'middleware' || ['a-core', 'a-database'].includes(module.info.relativeName)) {
        this._loadMiddlewaresAll_fromMetadata(middlewaresAll, module);
      }
    }
    return middlewaresAll;
  }

  private _loadMiddlewaresAll_fromMetadata(middlewaresAll: IMiddlewareItem[], module: IModule) {
    const middlewares = appResource.scenes[this.sceneName]?.[module.info.relativeName];
    if (!middlewares) return;
    for (const key in middlewares) {
      const beanOptions = middlewares[key];
      // push
      middlewaresAll.push({
        name: key.replace(`.${this.sceneName}.`, ':'),
        options: beanOptions.options as any,
        beanOptions,
      });
    }
  }

  // todo: should be removed
  private _loadMiddlewaresAll_fromConfig(middlewaresAll: IMiddlewareItem[], module: IModule) {
    const config = this.app.config.modules[module.info.relativeName];
    if (!config?.middlewares) return;
    for (const middlewareKey in config.middlewares) {
      const middlewareConfig = config.middlewares[middlewareKey];
      // bean
      const beanName = middlewareConfig.bean;
      if (!beanName) throw new Error(`bean not set for middleware: ${module.info.relativeName}.${middlewareKey}`);
      let bean;
      if (typeof beanName === 'string') {
        bean = {
          module: module.info.relativeName,
          name: beanName,
        };
      } else {
        bean = {
          module: beanName.module || module.info.relativeName,
          name: beanName.name,
        };
      }
      const beanFullName = `${bean.module}.middleware.${bean.name}`;
      const beanOptions = appResource.getBean(beanFullName)!;
      // push
      middlewaresAll.push({
        name: middlewareKey,
        options: middlewareConfig,
        beanOptions,
        fromConfig: true,
      });
    }
  }

  _wrapMiddleware(item: IMiddlewareItem, executeCustom?: Function) {
    const sceneName = this.sceneName;
    const fn = (ctx: VonaContext, next) => {
      let packet;
      if (sceneName === 'packet') {
        ctx = ctx.ctx;
        packet = ctx.packet;
      }
      // optionsPrimitive
      const optionsPrimitive = item.pipeOptionsPrimitive;
      // options
      const options = this.combineMiddlewareOptions(ctx, item);
      // enable match ignore dependencies
      if (!optionsPrimitive && (options.enable === false || !middlewareMatch(ctx, options))) {
        if (!ctx[SymboleMiddlewareStatus][sceneName]) {
          ctx[SymboleMiddlewareStatus][sceneName] = {};
        }
        ctx[SymboleMiddlewareStatus][sceneName][item.name] = false;
        return typeof next === 'function' ? next() : next;
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = ctx.app.bean._getBean(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`${sceneName} bean not found: ${beanFullName}`);
      }
      if (executeCustom) {
        return executeCustom(beanInstance, options, next);
      }
      if (packet) {
        return Cast(beanInstance).execute(packet, options, next);
      }
      return Cast(beanInstance).execute(options, next);
    };
    fn._name = item.name;
    return fn;
  }
}

function middlewareMatch(ctx, options) {
  if (!options.match && !options.ignore) {
    return true;
  }
  const match = pathMatching(options);
  return match(ctx);
}

// function middlewareDeps(sceneName: string, ctx, options) {
//   let deps = options.dependencies || [];
//   if (typeof deps === 'string') deps = deps.split(',');
//   return deps.every(key => ctx[SymboleMiddlewareStatus][sceneName]?.[key] !== false);
// }
