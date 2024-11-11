import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';

export interface IMiddlewareOptionsPipe extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsPipe>({ global: true, dependencies: 'a-core:interceptor' })
export class MiddlewarePipe extends BeanBase implements IMiddlewareExecute {
  private middlewareLike: MiddlewareLike;

  protected __init__() {
    this.middlewareLike = this.bean._newBean(MiddlewareLike, 'pipe');
  }

  async execute(_options: IMiddlewareOptionsPipe, next: Next) {
    // todo: support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    // compose
    await this.middlewareLike.composeAsync()(this.ctx);
    // next
    return next();
  }
}
