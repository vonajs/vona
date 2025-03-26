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
    return await this.performActionInner(method, url, options);
  }

  async performActionInner<
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
    return this.newCtxIsolate(async () => {
      return await fn();
    });
  }

  async newCtxIsolate<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.dbLevel = options.dbLevel ?? 1; // same as isolate
    } else {
      options.dbLevel = options.dbLevel ?? this.ctx.dbLevel + 1;
    }
    return await this.newCtx(fn, options);
  }

  async mockCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.instanceName = options.instanceName === undefined ? '' : options.instanceName;
    } else {
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    return await this.newCtx(fn, options);
  }

  async newCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.dbLevel = options.dbLevel ?? 1; // same as isolate
    } else {
      options.dbLevel = options.dbLevel ?? this.ctx.dbLevel;
      options.dbClientName = options.dbClientName === undefined ? this.ctx.dbMeta.currentClient.clientName : options.dbClientName;
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    // run
    const isolate = !this.ctx || this.ctx.dbLevel !== options.dbLevel;
    const ctxCaller = (!isolate && this.ctx) ? this.ctx : undefined;
    const ctxCallerDbMeta = ctxCaller?.dbMeta;// must before ctxStorage.run
    const ctx = this.app.createAnonymousContext(options.req, options.reqInherit);
    return await this.app.ctxStorage.run(ctx, async () => {
      // innerAccess
      ctx.innerAccess = options.innerAccess !== false;
      // dbLevel: must before ctx.dbMeta
      ctx.dbLevel = options.dbLevel;
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
        // dbMeta
        if (ctxCallerDbMeta!.inTransaction) {
          ctx.dbMeta = ctxCallerDbMeta!;
        } else {
          ctx.dbMeta.currentClient = ctxCallerDbMeta!.currentClient;
        }
      } else {
        // isolate
        // dbMeta
        ctx.dbMeta = this.bean.database.createDbMeta(options.dbClientName);
        // extraData
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
        });
      } else {
        res = await fn();
      }
      // tail done
      await ctx.dbMeta.tailDone();
      // ok
      return res;
    });
  }
}
