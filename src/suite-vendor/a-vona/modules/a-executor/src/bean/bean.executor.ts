import type { FunctionAsync } from 'vona';
import type { IApiPathRecordMethodMap } from 'vona-module-a-web';
import type { INewCtxOptions, IPerformActionOptions } from '../types/executor.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { __delegateProperties } from '../lib/utils.ts';

@Bean()
export class BeanExecutor extends BeanBase {
  async performAction<
    METHOD extends keyof IApiPathRecordMethodMap,
    PATH extends keyof IApiPathRecordMethodMap[METHOD],
  >(method: METHOD,
    path: PATH,
    options?: IPerformActionOptions,
  ): Promise<any> {
    // url
    const url = this.app.util.combineApiPath(path as any, '', true, true);
    return await this.scope.service.executor.performActionInner(method, url, options);
  }

  runInBackground(fn: FunctionAsync<void>) {
    return this.bean.database.newDbIsolate(() => {
      return this.newCtx(fn);
    });
  }

  async newCtxIsolate<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    // instanceName !== undefined means isolate
    options.instanceName = options.instanceName === undefined ? this.ctx?.instanceName : options.instanceName;
    return this.newCtx(fn, options);
  }

  async mockCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    options.dbInfo = options.dbInfo === undefined ? true : options.dbInfo;
    options.instanceName = options.instanceName === undefined ? (this.ctx?.instanceName ?? '') : options.instanceName;
    return this.newCtx(fn, options);
  }

  async newCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    if (!options?.dbInfo) return this._newCtxInner(fn, options);
    const dbInfo = options.dbInfo === true ? {} : options.dbInfo;
    return this.bean.database.newDb(() => {
      return this._newCtxInner(fn, options);
    }, dbInfo);
  }

  private async _newCtxInner<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    // innerAccess
    const innerAccess = options.innerAccess !== false;
    // ctx ref
    const ctxRef = innerAccess ? this.ctx : undefined;
    // isolate
    const isolate = !ctxRef || options.instanceName !== undefined;
    const ctxCaller = (!isolate && ctxRef) ? ctxRef : undefined;
    // locale/instanceName
    if (ctxRef) {
      options.locale = options.locale === undefined ? ctxRef.locale : options.locale;
      options.instanceName = options.instanceName === undefined ? ctxRef.instanceName : options.instanceName;
    }
    // run
    const ctx = this.app.createAnonymousContext(options.req, options.res);
    return await this.app.ctxStorage.run(ctx, async () => {
      // innerAccess
      ctx.innerAccess = innerAccess;
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
        res = await this.bean.database.current.transaction.begin(async () => {
          return await fn();
        }, options.transactionOptions);
      } else {
        res = await fn();
      }
      // commitDone
      await ctx.commitDone();
      // ok
      return res;
    });
  }
}
