import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';

export interface IMiddlewareOptionsInterceptor extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsInterceptor>({ global: true, dependencies: 'a-core:guard' })
export class MiddlewareInterceptor extends BeanBase implements IMiddlewareExecute {
  private middlewareLike: MiddlewareLike;

  protected __init__() {
    this.middlewareLike = this.bean._newBean(MiddlewareLike, 'interceptor');
  }

  async execute(_options: IMiddlewareOptionsInterceptor, next: Next) {
    // todo: support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    //
    return await this.middlewareLike.composeAsync()(this.ctx, () => {
      return next();
    });
  }
}
