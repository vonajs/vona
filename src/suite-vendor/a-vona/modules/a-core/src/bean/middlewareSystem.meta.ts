import type { Next } from 'vona';
import { BeanBase } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import { MiddlewareSystem } from 'vona-module-a-aspect';
import { performance } from 'node:perf_hooks';

export interface IMiddlewareSystemOptionsMeta extends IDecoratorMiddlewareSystemOptions {
  logging: boolean;
}

@MiddlewareSystem<IMiddlewareSystemOptionsMeta>({ logging: false })
export class MiddlewareSystemMeta extends BeanBase implements IMiddlewareSystemExecute {
  async execute(options: IMiddlewareSystemOptionsMeta, next: Next) {
    const ctx = this.ctx;

    if (options.logging) {
      ctx.coreLogger.info('[meta] request started, host: %s, user-agent: %s', ctx.host, ctx.header['user-agent']);
    }
    await next();
    // total response time header
    if (ctx.performanceStarttime) {
      ctx.set('x-readtime', (Math.floor((performance.now() - ctx.performanceStarttime) * 1000) / 1000).toString());
    } else {
      ctx.set('x-readtime', (Date.now() - ctx.starttime).toString());
    }
  }
}
