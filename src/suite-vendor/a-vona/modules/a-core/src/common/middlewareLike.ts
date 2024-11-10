import { swapDeps } from '@cabloy/deps';
import pathMatching from 'egg-path-matching';
import { appMetadata, appResource, BeanSimple, IMiddlewareItem, SymbolUseMiddlewareLocal } from 'vona';

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

  async composeAsync() {
    const middlewares: any[] = [];
    // middlewares: global
    for (const item of this.middlewaresGlobal) {
      middlewares.push(wrapMiddleware(item));
    }
    // middlewares: route
    const middlewaresLocal = this._collectRouterMiddlewares();
    for (const item of middlewaresLocal) {
      middlewares.push(wrapMiddleware(item));
    }
    // invoke
    await this.ctx.app.meta.util.composeAsync(middlewares, __adapter)(this.ctx, async (_ctx, _next) => {
      // 这个_next有必要调用吗
      await _next();
    });
  }

  private _collectRouterMiddlewares() {
    // middlewaresLocal: controller
    const controllerMiddlewaresLocal = appMetadata.getOwnMetadataArray<string>(
      SymbolUseMiddlewareLocal,
      this.ctx.getClass(),
    );
    // middlewaresLocal: action
    const middlewaresLocal: IMiddlewareItem[] = [];
    const actionMiddlewaresLocal = appMetadata.getOwnMetadataArray<string>(
      SymbolUseMiddlewareLocal,
      this.ctx.getHandler(),
    );
    const middlewaresLocalAll: string[] = [];
    actionMiddlewaresLocal.forEach(item => {
      if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
    });
    controllerMiddlewaresLocal.forEach(item => {
      if (!middlewaresLocalAll.includes(item)) middlewaresLocalAll.push(item);
    });
    for (const middlewareName of middlewaresLocalAll) {
      const item = this.middlewaresNormal[middlewareName];
      if (!item) throw new Error(`middleware not found: ${middlewareName}`);
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
          throw new Error(`middleware ${dep} not found for dependents of ${middleware.name}`);
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
