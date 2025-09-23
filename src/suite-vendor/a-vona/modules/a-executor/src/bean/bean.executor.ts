import type { FunctionAsync } from 'vona';
import type { IApiPathRecordMethodMap } from 'vona-module-a-web';
import type { INewCtxOptions, IPerformActionOptions } from '../types/executor.ts';
import { isNil } from '@cabloy/utils';
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
    return this.bean.database.switchDbIsolate(() => {
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
    options.dbInfo = isNil(options.dbInfo) ? { level: 1 } : options.dbInfo;
    options.instanceName = options.instanceName === undefined ? (this.ctx?.instanceName ?? '') : options.instanceName;
    return this.newCtx(fn, options);
  }

  async newCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    return this._newCtxInnerStep1(() => {
      if (isNil(options?.dbInfo)) return this._newCtxInnerStep2(fn, options);
      return this.bean.database.switchDb(() => {
        return this._newCtxInnerStep2(fn, options);
      }, options?.dbInfo);
    }, options);
  }

  private async _newCtxInnerStep1<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
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
      return await fn();
    });
  }

  private async _newCtxInnerStep2<RESULT>(fn: FunctionAsync<RESULT>, options?: INewCtxOptions): Promise<RESULT> {
    // instance
    const instanceName = this.ctx.instanceName; // use default instanceName when undefined
    if (instanceName !== undefined && instanceName !== null) {
      this.ctx.instance = (await this.bean.instance.get(instanceName))!;
      // start instance
      if (options?.instance) {
        await this.$scope.instance.service.instance.checkAppReadyInstance(true);
      }
    }
    // execute
    let res: RESULT;
    if (options?.transaction) {
      res = await this.bean.database.current.transaction.begin(async () => {
        return await fn();
      }, options?.transactionOptions);
    } else {
      res = await fn();
    }
    // commitsDone
    await this.ctx.commitsDone();
    // ok
    return res;
  }
}
