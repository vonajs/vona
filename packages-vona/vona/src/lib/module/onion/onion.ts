import is from 'is-type-of';
import { swapDeps } from '@cabloy/deps';
import pathMatching from 'egg-path-matching';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IDecoratorMiddlewareOptionsGlobal,
  IMiddlewareBase,
  IMiddlewareItem,
  IMiddlewareOptionsMeta,
  SymboleMiddlewareStatus,
  SymbolUseMiddlewareLocal,
} from '../../../types/interface/middleware.js';
import { RouteHandlerArgumentMetaDecorator } from '../../../types/interface/pipe.js';
import { appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { VonaContext } from '../../../types/context/index.js';
import { cast } from '../../../types/utils/cast.js';
import { IModule } from '@cabloy/module-info';
import { compose, composeAsync, deepExtend } from '../../utils/util.js';
import { OnionSceneMeta, onionScenesMeta } from 'vona-shared';
import { Constructable } from '../../decorator/type/constructable.js';
import { IBeanRecord } from '../../bean/type.js';
import { IDecoratorAopOptions, TypeDecoratorAopOptionsMatch } from '../../../types/interface/aop.js';
import { VonaApplication } from '../../../types/index.js';

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

  compose(
    ctx: VonaContext,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
    executeCustom?: Function,
  ) {
    // compose
    const middlewares = this._composeMiddlewaresHandler(ctx, fnStart, fnMid, fnEnd, executeCustom);
    // invoke
    return compose(middlewares, __adapter);
  }

  composeAsync(
    ctx: VonaContext,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
    executeCustom?: Function,
  ) {
    // compose
    const middlewares = this._composeMiddlewaresHandler(ctx, fnStart, fnMid, fnEnd, executeCustom);
    // invoke
    return composeAsync(middlewares, __adapter);
  }

  composeSocketAsync() {
    return this._composeMiddlewaresGlobal();
  }

  composePipes(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator, executeCustom: Function) {
    const beanFullName = ctx.getClassBeanFullName();
    const handlerName = ctx.getHandler()!.name;
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

  private _composeMiddlewaresGlobal(executeCustom?: Function) {
    if (!this._cacheMiddlewaresGlobal) {
      const middlewares: Function[] = [];
      for (const item of this.middlewaresGlobal) {
        middlewares.push(this._wrapMiddleware(item, executeCustom));
      }
      this._cacheMiddlewaresGlobal = middlewares;
    }
    return this._cacheMiddlewaresGlobal;
  }

  private _collectArgumentMiddlewares(_ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
    if (!argMeta.pipes) return;
    return argMeta.pipes.map(pipe => {
      const { pipeName, options } = pipe();
      const item = this.middlewaresNormal[pipeName];
      if (!item) throw new Error(`${this.sceneName} not found: ${pipeName}`);
      return {
        ...item,
        argumentPipe: {
          options: options,
        },
      };
    });
  }

  private _composeMiddlewaresHandler(
    ctx: VonaContext,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
    executeCustom?: Function,
  ) {
    const beanFullName = ctx.getClassBeanFullName();
    const handlerName = ctx.getHandler()?.name;
    const key = beanFullName ? `${beanFullName}:${handlerName}` : '';
    if (!this._cacheMiddlewaresHandler[key]) {
      let middlewares: Function[] = [];
      if (fnStart) middlewares = middlewares.concat(fnStart);
      // middlewares: global
      middlewares = middlewares.concat(this._composeMiddlewaresGlobal(executeCustom));
      if (fnMid) middlewares = middlewares.concat(fnMid);
      // middlewares: handler
      const middlewaresLocal = this._collectMiddlewaresHandler(ctx);
      for (const item of middlewaresLocal) {
        middlewares.push(this._wrapMiddleware(item, executeCustom));
      }
      if (fnEnd) middlewares = middlewares.concat(fnEnd);
      this._cacheMiddlewaresHandler[key] = middlewares;
    }
    return this._cacheMiddlewaresHandler[key];
  }

  private _collectMiddlewaresHandler(ctx: VonaContext) {
    if (!ctx.getClass()) return [];
    // middlewaresLocal: controller
    const controllerMiddlewaresLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseMiddlewareLocal,
      ctx.getClass()!,
    )?.[this.sceneName] as string[];
    // middlewaresLocal: action
    const middlewaresLocal: IMiddlewareItem[] = [];
    const actionMiddlewaresLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseMiddlewareLocal,
      ctx.getClassPrototype()!,
      ctx.getHandlerName()!,
    )?.[this.sceneName] as string[];
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

  getMiddlewareItem(middlewareName: string): IMiddlewareItem {
    return this.middlewaresNormal[middlewareName];
  }

  combineMiddlewareOptions(ctx: VonaContext, item: IMiddlewareItem) {
    // optionsPrimitive
    const optionsPrimitive = item.beanOptions.optionsPrimitive;
    // options: meta/config
    const optionsMetaAndConfig = item.beanOptions.options;
    // options: instance config
    const optionsInstanceConfig = ctx.instance ? ctx.config.metadata[item.beanOptions.scene]?.[item.name] : undefined;
    // options: route
    //    not use route options for argument pipe
    let optionsRoute;
    if (!item.argumentPipe && this.sceneMeta.optionsRoute) {
      const route = ctx.route?.route;
      optionsRoute = route?.meta?.[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    }
    // options: argument pipe
    const optionsArgumentPipe = this.sceneMeta.optionsArgumentPipe ? item.argumentPipe?.options : undefined;
    // options: dynamic
    let optionsDynamic;
    if (this.sceneMeta.optionsDynamic) {
      optionsDynamic = ctx.meta.middlewares?.[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    }
    // final options
    let options;
    if (optionsPrimitive) {
      options = optionsDynamic ?? optionsArgumentPipe ?? optionsRoute ?? optionsInstanceConfig ?? optionsMetaAndConfig;
    } else {
      options = deepExtend(
        {},
        optionsMetaAndConfig,
        optionsInstanceConfig,
        optionsRoute,
        optionsArgumentPipe,
        optionsDynamic,
      );
    }
    // ok
    return options;
  }

  private _handleDependents(middlewares: IMiddlewareItem[]) {
    for (const middleware of middlewares) {
      const middlewareOptions = middleware.beanOptions.options as IDecoratorMiddlewareOptionsGlobal;
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
        const options = middleware2.beanOptions.options as IDecoratorMiddlewareOptionsGlobal;
        if (!options.dependencies) options.dependencies = [];
        if (!Array.isArray(options.dependencies)) {
          options.dependencies = [options.dependencies] as never[];
        }
        if (options.dependencies.findIndex(item => item === middleware.name) === -1) {
          options.dependencies.push(middleware.name as never);
        }
      }
    }
  }

  private _swapMiddlewares(middlewares: IMiddlewareItem[]) {
    swapDeps(middlewares, {
      name: 'name',
      dependencies: item => {
        const middlewareOptions = cast<IMiddlewareItem>(item).beanOptions.options as IDecoratorMiddlewareOptionsGlobal;
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
      const name = key.replace(`.${this.sceneName}.`, ':');
      // options
      const optionsConfig = this.app.config.metadata[beanOptions.scene]?.[name];
      if (beanOptions.optionsPrimitive) {
        beanOptions.options = optionsConfig === undefined ? beanOptions.options : optionsConfig;
      } else {
        beanOptions.options = deepExtend({}, beanOptions.options, optionsConfig);
      }
      // push
      middlewaresAll.push({
        name,
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
      // options
      beanOptions.options = middlewareConfig;
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
      const optionsPrimitive = item.beanOptions.optionsPrimitive;
      // options
      const options = this.combineMiddlewareOptions(ctx, item);
      // enable match ignore dependencies
      if (
        !optionsPrimitive &&
        (options.enable === false || !middlewareMatchMeta(this.app, options.meta) || !middlewareMatch(ctx, options))
      ) {
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
        return cast(beanInstance).execute(packet, options, next);
      }
      return cast(beanInstance).execute(options, next);
    };
    fn._name = item.name;
    return fn;
  }

  findAopsMatched<T>(A: Constructable<T>): string[] | undefined;
  findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): string[] | undefined;
  findAopsMatched(beanFullName: string): string[] | undefined;
  findAopsMatched<T>(beanFullName: Constructable<T> | string): string[] | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    // loop
    const aopsMatched: string[] = [];
    for (const aop of this.middlewaresGlobal) {
      const aopOptions = aop.beanOptions.options as IDecoratorAopOptions;
      // not self
      if (aop.beanOptions.beanFullName === beanOptions.beanFullName) continue;
      // // check if match aop
      // if (beanOptions.scene === 'aop' && !aop.beanOptions.matchAop) continue;
      if (aopOptions.enable === false) continue;
      if (!middlewareMatchMeta(this.app, aopOptions.meta)) continue;
      if (
        (aopOptions.match && __aopMatch(aopOptions.match, beanOptions.beanFullName)) ||
        (aopOptions.ignore && !__aopMatch(aopOptions.ignore, beanOptions.beanFullName))
      ) {
        aopsMatched.push(aop.beanOptions.beanFullName);
      }
    }
    return aopsMatched;
  }
}

function middlewareMatchMeta(app: VonaApplication, meta?: IMiddlewareOptionsMeta) {
  return app.meta.util.checkMiddlewareOptionsMeta(meta);
}

function middlewareMatch(ctx: VonaContext, options: IMiddlewareBase) {
  if (!options.match && !options.ignore) {
    return true;
  }
  const match = pathMatching(options);
  return match(ctx);
}

function __aopMatch(match: TypeDecoratorAopOptionsMatch, beanFullName: string) {
  if (!Array.isArray(match)) {
    return (
      (typeof match === 'string' && match === beanFullName) || (is.regExp(match) && cast(match).test(beanFullName))
    );
  }
  return match.some(item => __aopMatch(item, beanFullName));
}

// function middlewareDeps(sceneName: string, ctx, options) {
//   let deps = options.dependencies || [];
//   if (typeof deps === 'string') deps = deps.split(',');
//   return deps.every(key => ctx[SymboleMiddlewareStatus][sceneName]?.[key] !== false);
// }
