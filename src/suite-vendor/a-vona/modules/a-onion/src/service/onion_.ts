import type { ISwapDepsItem } from '@cabloy/deps';
import type { IModule, OnionSceneMeta } from '@cabloy/module-info';
import type {
  Next,
  VonaContext,
} from 'vona';
import type {
  IOnionExecuteCustom,
  IOnionOptionsDeps,
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionSlice,
} from '../types/onion.ts';
import { isRegExp } from 'node:util/types';
import { swapDeps } from '@cabloy/deps';
import { getOnionScenesMeta } from '@cabloy/module-info';
import {
  appMetadata,
  appResource,
  BeanBase,
  cast,
  compose,
  deepExtend,
  SymbolProxyDisable,
} from 'vona';
import { Service } from 'vona-module-a-web';
import {
  SymbolUseOnionLocal,
} from '../types/onion.ts';

const SymbolOnionsEnabled = Symbol('SymbolOnionsEnabled');
const SymbolOnionsEnabledWrapped = Symbol('SymbolOnionsEnabledWrapped');

@Service()
export class ServiceOnion<OPTIONS, ONIONNAME extends string> extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;
  sceneName: string;
  sceneMeta: OnionSceneMeta;
  onionsNormal: Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
  onionsGlobal: IOnionSlice<OPTIONS, ONIONNAME>[];

  private [SymbolOnionsEnabled]: Record<string, IOnionSlice<OPTIONS, ONIONNAME>[]> = {};
  private [SymbolOnionsEnabledWrapped]: Record<string, Function[]> = {};

  _cacheOnionsGlobal: Function[];
  _cacheOnionsHandler: Record<string, Function[]> = {};

  protected __init__(sceneName: string) {
    this.sceneName = sceneName;
    this.sceneMeta = getOnionScenesMeta(this.app.meta.modules)[this.sceneName];
    this._loadOnions();
    this._swapOnions(this.onionsGlobal);
  }

  compose(
    ctx: VonaContext | undefined,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
    executeCustom?: IOnionExecuteCustom,
  ) {
    // compose
    const onions = this._composeOnionsHandler(ctx, fnStart, fnMid, fnEnd, executeCustom);
    // invoke
    return compose(onions);
  }

  getOnionsEnabled(selector?: string) {
    if (!selector) selector = '';
    if (!this[SymbolOnionsEnabled][selector]) {
      this[SymbolOnionsEnabled][selector] = this.onionsGlobal.filter(onionSlice => {
        const onionOptions = onionSlice.beanOptions.options as IOnionOptionsEnable & IOnionOptionsMatch<string>;
        return this.bean.onion.checkOnionOptionsEnabled(onionOptions, selector);
      }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
      const message = `getOnionsEnabled:${this.sceneName}${selector ? `:${selector}` : ''}\n${JSON.stringify(this[SymbolOnionsEnabled][selector], null, 2)}`;
      this.loggerChild('onion').verbose(message);
    }
    return this[SymbolOnionsEnabled][selector];
  }

  getOnionsEnabledOfMeta(beanName: string, selector?: string) {
    return this.getOnionsEnabled(selector).filter(item => item.beanOptions.name === beanName);
  }

  getOnionsEnabledWrapped(wrapFn: Function, selector?: string) {
    if (!selector) selector = '';
    if (!this[SymbolOnionsEnabledWrapped][selector]) {
      const onions = this.getOnionsEnabled(selector);
      this[SymbolOnionsEnabledWrapped][selector] = onions.map(item => {
        return wrapFn(item);
      });
    }
    return this[SymbolOnionsEnabledWrapped][selector];
  }

  public get composedOnionsGlobal() {
    return this._composeOnionsGlobal();
  }

  private _composeOnionsGlobal(executeCustom?: IOnionExecuteCustom) {
    if (!this._cacheOnionsGlobal) {
      const onions: Function[] = [];
      for (const item of this.onionsGlobal) {
        onions.push(this._wrapOnion(item, executeCustom));
      }
      this._cacheOnionsGlobal = onions;
    }
    return this._cacheOnionsGlobal;
  }

  private _composeOnionsHandler(
    ctx: VonaContext | undefined,
    fnStart?: Function | Function[],
    fnMid?: Function | Function[],
    fnEnd?: Function | Function[],
    executeCustom?: IOnionExecuteCustom,
  ) {
    const beanFullName = ctx?.getControllerBeanFullName();
    const handlerName = ctx?.getHandler()?.name;
    const key = beanFullName ? `${beanFullName}:${handlerName}` : '';
    if (!this._cacheOnionsHandler[key]) {
      let onions: Function[] = [];
      if (fnStart) onions = onions.concat(fnStart);
      // onions: global
      onions = onions.concat(this._composeOnionsGlobal(executeCustom));
      if (fnMid) onions = onions.concat(fnMid);
      // onions: handler
      const onionsLocal = this._collectOnionsHandler(ctx);
      for (const item of onionsLocal) {
        onions.push(this._wrapOnion(item, executeCustom));
      }
      if (fnEnd) onions = onions.concat(fnEnd);
      this._cacheOnionsHandler[key] = onions;
    }
    return this._cacheOnionsHandler[key];
  }

  public _collectOnionsHandler(ctx: VonaContext | undefined) {
    if (!ctx?.getController()) return [];
    // onionsLocal: controller
    const controllerOnionsLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseOnionLocal,
      ctx.getController()!,
    )?.[this.sceneName] as string[];
    // onionsLocal: action
    const onionsLocal: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
    const actionOnionsLocal = appMetadata.getMetadata<Record<string, string[]>>(
      SymbolUseOnionLocal,
      ctx.getControllerPrototype()!,
      ctx.getHandlerName()!,
    )?.[this.sceneName] as string[];
    const onionsLocalAll: string[] = [];
    if (actionOnionsLocal) {
      actionOnionsLocal.forEach(item => {
        if (!onionsLocalAll.includes(item)) onionsLocalAll.push(item);
      });
    }
    if (controllerOnionsLocal) {
      controllerOnionsLocal.forEach(item => {
        if (!onionsLocalAll.includes(item)) onionsLocalAll.push(item);
      });
    }
    for (const onionName of onionsLocalAll) {
      const item = this.onionsNormal[onionName];
      if (!item) throw new Error(`${this.sceneName} not found: ${onionName}`);
      onionsLocal.push(item);
    }
    return onionsLocal;
  }

  getOnionSlice(onionName: ONIONNAME): IOnionSlice<OPTIONS, ONIONNAME> {
    return this.onionsNormal[onionName];
  }

  getOnionOptions<OPTIONS>(onionName: ONIONNAME): OPTIONS | undefined {
    return this.getOnionSlice(onionName).beanOptions.options as OPTIONS | undefined;
  }

  getOnionOptionsDynamic<OPTIONS>(onionName: ONIONNAME): OPTIONS | undefined {
    const item = this.getOnionSlice(onionName);
    return this.combineOnionOptions(item);
  }

  combineOnionOptions(item: IOnionSlice<OPTIONS, ONIONNAME>) {
    const ctx = this.ctx;
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
      optionsRoute = route?.meta?.[item.beanOptions.beanFullName];
    }
    // options: argument pipe
    const optionsArgumentPipe = this.sceneMeta.optionsArgumentPipe ? cast(item).argumentPipe?.options : undefined;
    // options: dynamic
    let optionsDynamic;
    if (this.sceneMeta.optionsDynamic) {
      optionsDynamic = ctx.onionsDynamic?.[item.beanOptions.scene]?.[item.name];
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

  private _swapOnions(onions: IOnionSlice<OPTIONS, ONIONNAME>[]) {
    swapDeps(onions as ISwapDepsItem[], {
      name: 'name',
      dependencies: item => {
        const onionOptions = cast<IOnionSlice<OPTIONS, ONIONNAME>>(item).beanOptions.options as IOnionOptionsDeps<string>;
        return onionOptions.dependencies as any;
      },
      dependents: item => {
        const onionOptions = cast<IOnionSlice<OPTIONS, ONIONNAME>>(item).beanOptions.options as IOnionOptionsDeps<string>;
        return onionOptions.dependents as any;
      },
    });
  }

  private _loadOnions() {
    const onionsAll = this._loadOnionsAll();
    this.onionsNormal = {} as Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
    this.onionsGlobal = [];
    // load
    for (const item of onionsAll) {
      // normal
      this.onionsNormal[item.name] = item;
      // global
      if (!this.sceneMeta.hasLocal || cast(item.beanOptions.options)?.global) {
        this.onionsGlobal.push(item);
      }
    }
  }

  private _loadOnionsAll() {
    const onionsAll: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
    for (const module of this.app.meta.modulesArray) {
      this._loadOnionsAll_fromMetadata(onionsAll, module);
    }
    return onionsAll;
  }

  private _loadOnionsAll_fromMetadata(onionsAll: IOnionSlice<OPTIONS, ONIONNAME>[], module: IModule) {
    const onions = appResource.scenes[this.sceneName]?.[module.info.relativeName];
    if (!onions) return;
    for (const key in onions) {
      const beanOptions = onions[key];
      const name = key.replace(`.${this.sceneName}.`, ':') as ONIONNAME;
      // options
      const optionsConfig = this.app.config.onions[beanOptions.scene]?.[name];
      if (beanOptions.optionsPrimitive) {
        beanOptions.options = optionsConfig === undefined ? beanOptions.options : optionsConfig;
      } else {
        beanOptions.options = deepExtend({}, beanOptions.options, optionsConfig);
      }
      // push
      onionsAll.push({
        name,
        beanOptions: beanOptions as any,
      });
    }
  }

  /** internal */
  public _wrapOnion(item: IOnionSlice<OPTIONS, ONIONNAME>, executeCustom?: IOnionExecuteCustom) {
    const sceneName = this.sceneName;
    const fn = (data: any, next: Next) => {
      // optionsPrimitive
      const optionsPrimitive = item.beanOptions.optionsPrimitive;
      // options
      const options = this.combineOnionOptions(item);
      // enable match ignore
      if (!optionsPrimitive && !this.bean.onion.checkOnionOptionsEnabled(options, this._getRoutePathForMatch())) {
        return next(data);
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`${sceneName} bean not found: ${beanFullName}`);
      }
      if (executeCustom) {
        return executeCustom(beanInstance, data, options, next);
      }
      return cast(beanInstance).execute(options, next);
    };
    fn._name = item.name;
    return fn;
  }

  private _getRoutePathForMatch() {
    const routePathRaw: string | RegExp | undefined = this.ctx.route?.routePathRaw;
    if (!routePathRaw || isRegExp(routePathRaw)) return;
    return routePathRaw.startsWith('//')
      ? `/${this.ctx.path}`
      : this.ctx.path.substring(this.app.config.server.globalPrefix.length);
  }
}
