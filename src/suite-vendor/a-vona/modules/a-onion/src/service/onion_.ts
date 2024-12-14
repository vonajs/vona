import { ISwapDepsItem, swapDeps } from '@cabloy/deps';
import { IModule, OnionSceneMeta } from '@cabloy/module-info';
import pathMatching from 'egg-path-matching';
import {
  appMetadata,
  appResource,
  BeanBase,
  cast,
  compose,
  composeAsync,
  deepExtend,
  SymbolProxyDisable,
  VonaApplication,
  VonaContext,
} from 'vona';
import { Service } from 'vona-module-a-web';
import { getOnionScenesMeta } from 'vona-shared';
import {
  IOnionOptionsBase,
  IOnionOptionsDeps,
  IOnionOptionsEnable,
  IOnionOptionsMeta,
  IOnionSlice,
  SymbolUseOnionLocal,
} from '../types/onion.js';

const __adapter = (_context, chain) => {
  return {
    receiver: undefined,
    fn: chain,
  };
};

const SymbolMiddlewaresEnabled = Symbol('SymbolMiddlewaresEnabled');

@Service()
export class ServiceOnion<OPTIONS, ONIONNAME extends string> extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;
  sceneName: string;
  sceneMeta: OnionSceneMeta;
  middlewaresNormal: Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
  middlewaresGlobal: IOnionSlice<OPTIONS, ONIONNAME>[];

  private [SymbolMiddlewaresEnabled]: IOnionSlice<OPTIONS, ONIONNAME>[];

  _cacheMiddlewaresGlobal: Function[];
  _cacheMiddlewaresHandler: Record<string, Function[]> = {};

  protected __init__(sceneName: string) {
    this.sceneName = sceneName;
    this.sceneMeta = getOnionScenesMeta(this.app.meta.modules)[this.sceneName];
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

  get middlewaresEnabled() {
    if (!this[SymbolMiddlewaresEnabled]) {
      this[SymbolMiddlewaresEnabled] = this.middlewaresGlobal.filter(middlewareItem => {
        const middlewareOptions = middlewareItem.beanOptions.options as IOnionOptionsEnable;
        return (
          middlewareOptions.enable !== false && cast(this.app.bean).onion.checkOnionOptionsMeta(middlewareOptions.meta)
        );
      }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
    }
    return this[SymbolMiddlewaresEnabled];
  }

  public get composedMiddlewaresGlobal() {
    return this._composeMiddlewaresGlobal();
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

  public _collectMiddlewaresHandler(ctx: VonaContext) {
    if (!ctx.getClass()) return [];
    // middlewaresLocal: controller
    const controllerMiddlewaresLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseOnionLocal,
      ctx.getClass()!,
    )?.[this.sceneName] as string[];
    // middlewaresLocal: action
    const middlewaresLocal: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
    const actionMiddlewaresLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseOnionLocal,
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

  getMiddlewareItem(middlewareName: ONIONNAME): IOnionSlice<OPTIONS, ONIONNAME> {
    return this.middlewaresNormal[middlewareName];
  }

  getMiddlewareOptions<OPTIONS>(middlewareName: ONIONNAME): OPTIONS | undefined {
    return this.getMiddlewareItem(middlewareName).beanOptions.options as OPTIONS | undefined;
  }

  getMiddlewareOptionsDynamic<OPTIONS>(middlewareName: ONIONNAME): OPTIONS | undefined {
    const item = this.getMiddlewareItem(middlewareName);
    return this.combineMiddlewareOptions(this.ctx, item);
  }

  combineMiddlewareOptions(ctx: VonaContext, item: IOnionSlice<OPTIONS, ONIONNAME>) {
    // optionsPrimitive
    const optionsPrimitive = item.beanOptions.optionsPrimitive;
    // options: meta/config
    const optionsMetaAndConfig = item.beanOptions.options;
    // options: instance config
    const optionsInstanceConfig = ctx.instance ? ctx.config.onions[item.beanOptions.scene]?.[item.name] : undefined;
    // options: route
    //    not use route options for argument pipe
    let optionsRoute;
    if (!cast(item).argumentPipe && this.sceneMeta.optionsRoute) {
      const route = ctx.route?.route;
      optionsRoute = route?.meta?.[cast(item).fromConfig ? item.name : item.beanOptions.beanFullName];
    }
    // options: argument pipe
    const optionsArgumentPipe = this.sceneMeta.optionsArgumentPipe ? cast(item).argumentPipe?.options : undefined;
    // options: dynamic
    let optionsDynamic;
    if (this.sceneMeta.optionsDynamic) {
      if (cast(item).fromConfig) {
        optionsDynamic = cast(ctx.meta).onionsDynamic?.[item.name as any];
      } else {
        optionsDynamic = cast(ctx.meta).onionsDynamic?.[item.beanOptions.scene]?.[item.name];
      }
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

  private _handleDependents(middlewares: IOnionSlice<OPTIONS, ONIONNAME>[]) {
    for (const middleware of middlewares) {
      const middlewareOptions = middleware.beanOptions.options as IOnionOptionsDeps<string>;
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
        const options = middleware2.beanOptions.options as IOnionOptionsDeps<string>;
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

  private _swapMiddlewares(middlewares: IOnionSlice<OPTIONS, ONIONNAME>[]) {
    swapDeps(middlewares as ISwapDepsItem[], {
      name: 'name',
      dependencies: item => {
        const middlewareOptions = cast<IOnionSlice<OPTIONS, ONIONNAME>>(item).beanOptions
          .options as IOnionOptionsDeps<string>;
        return middlewareOptions.dependencies as any;
      },
    });
  }

  private _loadMiddlewares() {
    const middlewaresAll = this._loadMiddlewaresAll();
    this.middlewaresNormal = {} as Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
    this.middlewaresGlobal = [];
    // load
    for (const item of middlewaresAll) {
      // normal
      this.middlewaresNormal[item.name] = item;
      // global
      if (!this.sceneMeta.hasLocal || cast(item.beanOptions.options)?.global) {
        this.middlewaresGlobal.push(item);
      }
    }
  }

  private _loadMiddlewaresAll() {
    const middlewaresAll: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
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

  private _loadMiddlewaresAll_fromMetadata(middlewaresAll: IOnionSlice<OPTIONS, ONIONNAME>[], module: IModule) {
    const middlewares = appResource.scenes[this.sceneName]?.[module.info.relativeName];
    if (!middlewares) return;
    for (const key in middlewares) {
      const beanOptions = middlewares[key];
      const name = key.replace(`.${this.sceneName}.`, ':') as ONIONNAME;
      // options
      const optionsConfig = this.app.config.onions[beanOptions.scene]?.[name];
      if (beanOptions.optionsPrimitive) {
        beanOptions.options = optionsConfig === undefined ? beanOptions.options : optionsConfig;
      } else {
        beanOptions.options = deepExtend({}, beanOptions.options, optionsConfig);
      }
      // push
      // todo: remove options/as any
      middlewaresAll.push({
        name,
        options: beanOptions.options as any,
        beanOptions: beanOptions as any,
      } as any);
    }
  }

  // todo: should be removed
  private _loadMiddlewaresAll_fromConfig(middlewaresAll: IOnionSlice<OPTIONS, ONIONNAME>[], module: IModule) {
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
      // todo: remove options/fromConfig/as any
      middlewaresAll.push({
        name: middlewareKey as ONIONNAME,
        options: middlewareConfig,
        beanOptions: beanOptions as any,
        fromConfig: true,
      } as any);
    }
  }

  _wrapMiddleware(item: IOnionSlice<OPTIONS, ONIONNAME>, executeCustom?: Function) {
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
}

function middlewareMatchMeta(app: VonaApplication, meta?: IOnionOptionsMeta) {
  return cast(app.bean).onion.checkOnionOptionsMeta(meta);
}

function middlewareMatch(ctx: VonaContext, options: IOnionOptionsBase) {
  if (!options.match && !options.ignore) {
    return true;
  }
  const match = pathMatching(options);
  return match(ctx);
}
