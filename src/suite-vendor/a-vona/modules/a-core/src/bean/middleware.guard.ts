import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';

export interface IMiddlewareOptionsGuard extends IDecoratorMiddlewareOptions {
  test?: string;
}

@Middleware<IMiddlewareOptionsGuard>({ global: true })
export class MiddlewareGuard extends BeanBase implements IMiddlewareExecute {
  private middlewareLike: MiddlewareLike;

  protected __init__() {
    this.middlewareLike = this.bean._newBean(MiddlewareLike, 'guard');
  }

  async execute(_options: IMiddlewareOptionsGuard, next: Next) {
    const res = await this.middlewareLike.composeAsync()(this.ctx, async (_ctx, _next) => {
      // 这个_next有必要调用吗
      await _next();
    });
    console.log('guard execute:', res);
    // next
    return next();
  }
}
