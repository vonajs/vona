import { Bean, BeanBase, FunctionAsync } from 'vona';
import { IExecutorMockCtxOptions, IRunInAnonymousContextScopeOptions } from '../types/executor.js';

@Bean()
export class BeanExecutor extends BeanBase {
  runInBackground(fn: FunctionAsync<void>) {
    this.ctx.runInBackground(async () => {
      return await this.newCtxIsolate(async () => {
        return await fn();
      });
    });
  }

  async runInAnonymousContextScope<RESULT>(
    fn: FunctionAsync<RESULT>,
    options?: IRunInAnonymousContextScopeOptions,
  ): Promise<RESULT> {
    // url
    // todo: remove /api/a/base, need not set url
    const url = options?.module ? this.app.meta.util.combineApiPath(options.module, '', true, false) : '/api/a/base/';
    const req = {
      method: 'post',
      url,
    };
    const locale = options?.locale;
    const subdomain = options?.subdomain;
    return await this.app.runInAnonymousContextScope(async ctx => {
      (<any>ctx.req).ctx = ctx;
      // locale
      Object.defineProperty(ctx, 'locale', {
        get() {
          return locale || this.app.config.i18n.defaultLocale;
        },
      });
      // subdomain
      Object.defineProperty(ctx, 'subdomain', {
        get() {
          return subdomain;
        },
      });
      // instance
      if (subdomain !== undefined && subdomain !== null) {
        ctx.instance = await this.bean.instance.get(subdomain);
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
    }, req as any);
  }

  async newCtxIsolate<RESULT>(fn: FunctionAsync<RESULT>, options?: IExecutorMockCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.dbLevel = options.dbLevel ?? 1; // same as isolate
    } else {
      options.dbLevel = options.dbLevel ?? this.ctx.dbLevel + 1;
    }
    return await this.newCtx(fn, options);
  }

  async newCtx<RESULT>(fn: FunctionAsync<RESULT>, options?: IExecutorMockCtxOptions): Promise<RESULT> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.dbLevel = options.dbLevel ?? 1; // same as isolate
    } else {
      options.dbLevel = options.dbLevel ?? this.ctx.dbLevel;
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.subdomain = options.subdomain === undefined ? this.ctx.subdomain : options.subdomain;
    }
    // todo: remove
    const ctxModule = this.ctx?.module?.info?.relativeName;
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
          _delegateProperties(ctx, ctxCaller);
          // ctxCaller
          ctx.ctxCaller = ctxCaller;
        }
        // ctxParent
        if (options.extraData) {
          // delegateProperties
          _delegateProperties(ctx, {
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
      { locale: options.locale, subdomain: options.subdomain, module: ctxModule, instance: options.instance },
    );
  }
}

function _delegateProperties(ctx, ctxCaller) {
  const req = ctx.req;
  for (const property of ['state']) {
    _delegateProperty(ctx, ctxCaller, property);
  }
  for (const property of ['headers']) {
    _delegateProperty(ctx.request, ctxCaller.request, property);
    if (ctx.request[property]) req[property] = ctx.request[property];
  }
}

function _delegateProperty(ctx, ctxCaller, property) {
  const keyMock = `__executeBean__mock__${property}__`;
  const keyOriginal = `__executeBean__mock__${property}__original__`;
  if (['headers'].includes(property)) {
    ctx[keyOriginal] = ctx[property];
  }
  Object.defineProperty(ctx, property, {
    get() {
      const value = ctxCaller && ctxCaller[property];
      if (value) return value;
      //
      if (['headers'].includes(property)) {
        return ctx[keyOriginal];
      }
      //
      if (!ctx[keyMock]) {
        ctx[keyMock] = {};
      }
      return ctx[keyMock];
    },
  });
}
