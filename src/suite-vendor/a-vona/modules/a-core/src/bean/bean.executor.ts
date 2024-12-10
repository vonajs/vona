import { Bean, BeanBase, FunctionAsync, ILocalInfos, VonaContext } from 'vona';
import { IExecutorMockCtxOptions } from '../types/executor.js';

@Bean()
export class BeanExecutor extends BeanBase {
  async runInAnonymousContextScope<T>(
    scope: (ctx: VonaContext) => Promise<T>,
    {
      locale,
      subdomain,
      module,
      instance,
    }: { locale?: keyof ILocalInfos; subdomain?: string | null | undefined; module?: string; instance?: boolean },
  ): Promise<T> {
    // url
    // todo: remove /api/a/base, need not set url
    const url = module ? this.app.meta.util.combineApiPath(module, '', true, false) : '/api/a/base/';
    const req = {
      method: 'post',
      url,
    };
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
        if (instance) {
          await this.$scope.instance.service.instance.checkAppReadyInstance(true);
        }
      }
      // scope
      const res = await scope(ctx as unknown as VonaContext);
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
    // run
    const isolate = !this.ctx || this.ctx.dbLevel !== options.dbLevel;
    const ctxCaller = !isolate && this.ctx;
    return await this.runInAnonymousContextScope(
      async ctx => {
        // innerAccess
        ctx.innerAccess = true;
        // ctxCaller
        if (ctxCaller) {
          // delegateProperties
          delegateProperties(ctx, ctxCaller);
          // ctxCaller
          ctx.ctxCaller = ctxCaller;
        }
        // ctxParent
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
      { locale: options.locale, subdomain: options.subdomain, module: ctxModule, instance: options.instance },
    );
  }

  async _executeBeanFn({ fn, ctx, bean, context, args }) {
    let res;
    if (is.function(fn)) {
      res = await fn({ ctx, bean, context, args });
    } else {
      fn = fn || 'execute';
      if (!bean[fn]) {
        throw new Error(`bean method not found: ${bean.__beanFullName__}:${fn}`);
      }
      if (context != undefined) {
        res = await bean[fn](context);
      } else {
        if (Array.isArray(args)) {
          res = await bean[fn](...args);
        } else {
          res = await bean[fn](args);
        }
      }
    }
    return res;
  }
}

function delegateProperties(ctx, ctxCaller) {
  const req = ctx.req;
  for (const property of ['state']) {
    delegateProperty(ctx, ctxCaller, property);
  }
  for (const property of ['headers']) {
    delegateProperty(ctx.request, ctxCaller.request, property);
    if (ctx.request[property]) req[property] = ctx.request[property];
  }
}

function delegateProperty(ctx, ctxCaller, property) {
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
