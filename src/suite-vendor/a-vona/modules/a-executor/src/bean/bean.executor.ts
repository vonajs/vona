import type { FunctionAsync } from 'vona';
import type { IApiPathRecordMethodMap } from 'vona-module-a-web';
import type { INewCtxOptions, IPerformActionOptions, IRunInAnonymousContextScopeOptions } from '../types/executor.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { performActionInner } from '../lib/performAction.ts';
import { delegateProperties } from '../lib/utils.ts';

@Bean()
export class BeanExecutor extends BeanBase {
  // todo: url should not be relative path, should be absolute
  //       because ctxCaller.module removed
  //       so, maybe need provide this.scope.util.combineUrl
  //          this result is: /api/a/user/add, thus the method of combineApiPath not needed in performActionInner
  async performAction<
    // T,
    METHOD extends keyof IApiPathRecordMethodMap,
    PATHKEY extends keyof IApiPathRecordMethodMap[METHOD],
  >(method: METHOD,
    path: IApiPathRecordMethodMap[METHOD][PATHKEY],
    options?: IPerformActionOptions,
  ): Promise<any> {
    return await performActionInner(
      Object.assign({}, options, {
        ctxCaller: this.ctx,
        method,
        path,
      }),
    );
  }

  runInBackground(fn: FunctionAsync<void>) {
    return this.newCtxIsolate(async () => {
      return await fn();
    });
  }

  async runInAnonymousContextScope<RESULT>(
    fn: FunctionAsync<RESULT>,
    options?: IRunInAnonymousContextScopeOptions,
  ): Promise<RESULT> {
    // url
    const url = this.app.util.combineApiPath('', '/', true, true);
    const req = {
      method: 'post',
      url,
    };
    const locale = options?.locale;
    const instanceName = options?.instanceName;
    // ctx
    const ctx = this.app.createAnonymousContext(req);
    return await this.app.ctxStorage.run(ctx, async () => {
      // todo: check if need for passport
      // (<any>ctx.req).ctx = ctx;
      // locale
      if (locale !== undefined) {
        ctx.locale = locale;
      }
      // instanceName: hold undefined if undefined
      ctx.instanceName = instanceName;
      // instance
      if (instanceName !== undefined && instanceName !== null) {
        ctx.instance = (await this.bean.instance.get(instanceName))!;
        // start instance
        if (options?.instance) {
          await this.$scope.instance.service.instance.checkAppReadyInstance(true);
        }
      }
      // fn
      const res = await fn();
      // tail done
      await ctx.tailDone();
      // ok
      return res;
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
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    // run
    const isolate = !this.ctx || this.ctx.dbLevel !== options.dbLevel;
    const ctxCaller = !isolate && this.ctx;
    return await this.runInAnonymousContextScope(
      async () => {
        const ctx = this.app.ctx;
        // innerAccess
        ctx.innerAccess = true;
        // ctxCaller
        if (ctxCaller) {
          // delegateProperties
          delegateProperties(ctx, ctxCaller);
          // ctxCaller
          ctx.ctxCaller = ctxCaller;
        }
        // extraData
        if (options.extraData) {
          // delegateProperties
          delegateProperties(ctx, {
            state: options.extraData?.state,
            request: { headers: options.extraData?.headers },
          });
        }
        // dbLevel
        ctx.dbLevel = options.dbLevel;
        // execute
        let res: RESULT;
        if (options.transaction) {
          res = await ctx.transaction.begin(async () => {
            return await fn();
          });
        } else {
          res = await fn();
        }
        // ok
        return res;
      },
      { locale: options.locale, instanceName: options.instanceName, instance: options.instance },
    );
  }
}
