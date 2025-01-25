import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';
import { performance } from 'node:perf_hooks';

export interface IMiddlewareSystemOptionsMeta extends IDecoratorMiddlewareSystemOptions {
  logging: boolean;
}

@MiddlewareSystem<IMiddlewareSystemOptionsMeta>({ logging: false })
export class MiddlewareSystemMeta extends BeanBase implements IMiddlewareSystemExecute {
  async execute(options: IMiddlewareSystemOptionsMeta, next: Next) {
    if (options.logging) {
      this.ctx.coreLogger.info(
        '[meta] request started, host: %s, user-agent: %s',
        this.ctx.host,
        this.ctx.header['user-agent'],
      );
    }
    await next();
    // total response time header
    if (this.ctx.performanceStarttime) {
      this.ctx.set(
        'x-readtime',
        (Math.floor((performance.now() - this.ctx.performanceStarttime) * 1000) / 1000).toString(),
      );
    } else {
      this.ctx.set('x-readtime', (Date.now() - this.ctx.starttime).toString());
    }
  }
}
