import { swapDeps } from '@cabloy/deps';
import { pathMatching } from 'egg-path-matching';
import {
  appMetadata,
  appResource,
  BeanSimple,
  IMiddlewareItem,
  RouteHandlerArgumentMetaDecorator,
  SymboleMiddlewareStatus,
  SymbolUseMiddlewareLocal,
} from 'vona';

const __adapter = (_context, chain) => {
  return {
    receiver: undefined,
    fn: chain,
  };
};

export class MiddlewareLike extends BeanSimple {
  sceneName: string;
  middlewaresNormal: Record<string, IMiddlewareItem>;
  middlewaresGlobal: IMiddlewareItem[];

  protected __init__(sceneName: string) {
    this.sceneName = sceneName;
    this._loadMiddlewares();
    this._handleDependents(this.middlewaresGlobal);
    this._swapMiddlewares(this.middlewaresGlobal);
  }

  composeAsync(fnStart?, fnMid?, fnEnd?) {
    const middlewares: any[] = [];
    if (fnStart) middlewares.push(fnStart);
    // middlewares: global
    for (const item of this.middlewaresGlobal) {
      middlewares.push(wrapMiddleware(this.sceneName, item));
    }
    if (fnMid) middlewares.push(fnMid);
    // middlewares: route
    const middlewaresLocal = this._collectRouterMiddlewares();
    for (const item of middlewaresLocal) {
      middlewares.push(wrapMiddleware(this.sceneName, item));
    }
    if (fnEnd) middlewares.push(fnEnd);
    // invoke
    return this.ctx.app.meta.util.composeAsync(middlewares, __adapter);
  }

  collectPipes(argMeta: RouteHandlerArgumentMetaDecorator, executeCustom: Function) {
    const middlewares: any[] = [];
    // pipes: global
    for (const item of this.middlewaresGlobal) {
      middlewares.push(wrapMiddleware(this.sceneName, item, executeCustom));
    }
    // pipes: route
    const middlewaresLocal = this._collectRouterMiddlewares();
    for (const item of middlewaresLocal) {
      middlewares.push(wrapMiddleware(this.sceneName, item, executeCustom));
    }
    // pipes: arguments
    const middlewaresArgument = this._collectArgumentMiddlewares(argMeta);
    if (middlewaresArgument) {
      for (const item of middlewaresArgument) {
        middlewares.push(wrapMiddleware(this.sceneName, item, executeCustom));
      }
    }
    return middlewares;
  }

  private _collectArgumentMiddlewares(argMeta: RouteHandlerArgumentMetaDecorator) {
    if (!argMeta.pipes) return;
    return argMeta.pipes.map(pipe => {
      const middlewareName = pipe();
      const item = this.middlewaresNormal[middlewareName];
      if (!item) throw new Error(`${this.sceneName} not found: ${middlewareName}`);
      return item;
    });
  }

  private _collectRouterMiddlewares() {
    // middlewaresLocal: controller
    const controllerMiddlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, this.ctx.getClass())[
      this.sceneName
    ] as string[];
    // middlewaresLocal: action
    const middlewaresLocal: IMiddlewareItem[] = [];
    const actionMiddlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, this.ctx.getHandler())[
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

  private _handleDependents(middlewares: IMiddlewareItem[]) {
    for (const middleware of middlewares) {
      let dependents = middleware.options.dependents;
      if (!dependents) continue;
      if (!Array.isArray(dependents)) {
        dependents = dependents.split(',') as any[];
      }
      for (const dep of dependents!) {
        const middleware2 = middlewares.find(item => item.name === dep);
        if (!middleware2) {
          throw new Error(`${this.sceneName} ${dep} not found for dependents of ${middleware.name}`);
        }
        const options = middleware2.options;
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
    swapDeps(middlewares, { name: 'name', dependencies: 'options.dependencies' });
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
      if (item.options.global) {
        this.middlewaresGlobal.push(item);
      }
    }
  }

  private _loadMiddlewaresAll() {
    const middlewaresAll: IMiddlewareItem[] = [];
    for (const module of this.app.meta.modulesArray) {
      const middlewares = appResource.scenes[this.sceneName]?.[module.info.relativeName];
      if (!middlewares) continue;
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
    return middlewaresAll;
  }
}

export function wrapMiddleware(sceneName: string, item: IMiddlewareItem, executeCustom?: Function) {
  const fn = (ctx, next) => {
    // options
    const options = ctx.meta.getMiddlewareOptions(item);
    // enable match ignore dependencies
    if (options.enable === false || !middlewareMatch(ctx, options)) {
      if (!ctx[SymboleMiddlewareStatus][sceneName]) {
        ctx[SymboleMiddlewareStatus][sceneName] = {};
      }
      ctx[SymboleMiddlewareStatus][sceneName][item.name] = false;
      return typeof next === 'function' ? next() : next;
    }
    // execute
    const beanFullName = item.beanOptions.beanFullName;
    const beanInstance = ctx.bean._getBean(beanFullName);
    if (!beanInstance) {
      throw new Error(`${sceneName} bean not found: ${beanFullName}`);
    }
    if (executeCustom) {
      return executeCustom(beanInstance, options, next);
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

// function middlewareDeps(sceneName: string, ctx, options) {
//   let deps = options.dependencies || [];
//   if (typeof deps === 'string') deps = deps.split(',');
//   return deps.every(key => ctx[SymboleMiddlewareStatus][sceneName]?.[key] !== false);
// }
