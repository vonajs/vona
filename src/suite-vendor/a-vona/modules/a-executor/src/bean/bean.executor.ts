import type { FunctionAsync } from 'vona';
import type { IApiPathRecordMethodMap } from 'vona-module-a-web';
import type { INewCtxOptions, IPerformActionOptions } from '../types/executor.ts';
import { BeanBase, cast } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { __delegateProperties } from '../lib/utils.ts';
import { SymbolRouterMiddleware } from '../types/executor.ts';

@Bean()
export class BeanExecutor extends BeanBase {
  async performAction<
    METHOD extends keyof IApiPathRecordMethodMap,
    PATHKEY extends keyof IApiPathRecordMethodMap[METHOD],
  >(method: METHOD,
    path: IApiPathRecordMethodMap[METHOD][PATHKEY],
    options?: IPerformActionOptions,
  ): Promise<any> {
    // url
    const url = this.app.util.combineApiPath(path as any, '', true, true);
    return await this._performActionInner(method, url, options);
  }

  private async _performActionInner<
    METHOD extends keyof IApiPathRecordMethodMap,
  >(method: METHOD,
    url: string,
    options?: IPerformActionOptions,
  ): Promise<any> {
    // app
    const app = this.app;
    // new ctx
    return await this.newCtx(async () => {
      const ctx = this.ctx;
      // default status code
      ctx.res.statusCode = 404;
      ctx.req.method = method.toUpperCase();
      ctx.req.url = url;
      // json
      ctx.req.headers = Object.assign({}, ctx.req.headers);
      ctx.req.headers.accept = 'application/json';
      // headers
      if (options?.headers) {
        Object.assign(ctx.req.headers, options?.headers);
      }
      // authToken
      if (options?.authToken) {
        ctx.req.headers.authorization = `Bearer ${options?.authToken}`;
      }
      // query
      if (options?.query !== undefined) {
        cast(ctx.req).query = cast(ctx.request).query = options?.query;
      }
      // body
      cast(ctx.req).body = ctx.request.body = options?.body ?? {}; // body should set {} if undefined/null
      // onion
      ctx.onionsDynamic = options?.onions;
      // invoke middleware
      await app[SymbolRouterMiddleware](ctx);
      // check result
      if (ctx.status === 200) {
        if (!ctx.body || (ctx.body as any).code === undefined) {
          // not check code, e.g. text/xml
          return ctx.body;
        }
        if ((ctx.body as any).code === 0) {
          return (ctx.body as any).data;
        }
        throw app.util.createError(ctx.body);
      } else {
        if (ctx.body && typeof ctx.body === 'object') {
          throw app.util.createError(ctx.body);
        } else {
          throw app.util.createError({
            code: ctx.status,
            message: ctx.message,
          });
        }
      }
    }, { innerAccess: options?.innerAccess });
  }

  runInBackground(fn: FunctionAsync<void>) {
    return this.newCtxIsolate(() => {
      return fn();
    });
  }

  async newCtxIsolate<RESULT>(fn: FunctionAsync<RESULT>, options?: Omit<INewCtxOptions, 'dbInfo'>): Promise<RESULT> {
    return this.bean.database.newDbIsolate(undefined, () => {
      return this.newCtx(fn, options);
    });
  }

  async mockCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.instanceName = options.instanceName === undefined ? '' : options.instanceName;
    } else {
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    return this.newCtx(fn, options);
  }

  async newCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    if (!options?.dbInfo) return this._newCtxInner(fn, options);
    const dbInfo = options.dbInfo === true ? {} : options.dbInfo;
    return this.bean.database.newDb(dbInfo, () => {
      return this._newCtxInner(fn, options);
    });
  }

  private async _newCtxInner<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (this.ctx) {
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    // run
    const isolate = !this.ctx || options.instanceName !== undefined;
    const ctxCaller = (!isolate && this.ctx) ? this.ctx : undefined;
    const ctx = this.app.createAnonymousContext(options.req, options.reqInherit, options.res);
    return await this.app.ctxStorage.run(ctx, async () => {
      // innerAccess
      ctx.innerAccess = options.innerAccess !== false;
      // locale
      if (options.locale !== undefined) {
        ctx.locale = options.locale;
      }
      // instanceName: undefined/null is different
      if (options.instanceName !== undefined) {
        ctx.instanceName = options.instanceName;
      }
      // ctxCaller
      if (ctxCaller) {
        // delegateProperties
        __delegateProperties(ctx, ctxCaller);
        // ctxCaller
        ctx.ctxCaller = ctxCaller;
      } else {
        // isolate: extraData
        if (options.extraData) {
          // delegateProperties
          __delegateProperties(ctx, options.extraData);
        }
      }
      // instance
      const instanceName = ctx.instanceName; // use default instanceName when undefined
      if (instanceName !== undefined && instanceName !== null) {
        ctx.instance = (await this.bean.instance.get(instanceName))!;
        // start instance
        if (options.instance) {
          await this.$scope.instance.service.instance.checkAppReadyInstance(true);
        }
      }
      // execute
      let res: RESULT;
      if (options.transaction) {
        res = await ctx.dbMeta.transaction.begin(async () => {
          return await fn();
        }, options.transactionOptions);
      } else {
        res = await fn();
      }
      // tail done
      await ctx.dbMeta.commitDone();
      // ok
      return res;
    });
  }
}
