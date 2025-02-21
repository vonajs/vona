import type { Next } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import { performance } from 'node:perf_hooks';
import { BeanBase } from 'vona';
import { MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsMeta extends IDecoratorMiddlewareSystemOptions {
  logging: boolean;
}

@MiddlewareSystem<IMiddlewareSystemOptionsMeta>({ logging: false })
export class MiddlewareSystemMeta extends BeanBase implements IMiddlewareSystemExecute {
  async execute(options: IMiddlewareSystemOptionsMeta, next: Next) {
    const ctx = this.ctx;
    if (options.logging) {
      // todo: log
      // ctx.coreLogger.info('[meta] request started, host: %s, user-agent: %s', ctx.host, ctx.header['user-agent']);
    }
    // start
    ctx.starttime = Date.now();
    await next();
    // end
    if (ctx.performanceStarttime) {
      ctx.set('x-readtime', (Math.floor((performance.now() - ctx.performanceStarttime) * 1000) / 1000).toString());
    } else {
      ctx.set('x-readtime', (Date.now() - ctx.starttime).toString());
    }
  }
}
