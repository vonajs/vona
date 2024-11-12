import { BeanBase, IDecoratorMiddlewareOptionsGlobal, IMiddlewareExecute, Middleware, Next } from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';

export interface IMiddlewareOptionsGuard extends IDecoratorMiddlewareOptionsGlobal {}

@Middleware<IMiddlewareOptionsGuard>({ global: true })
export class MiddlewareGuard extends BeanBase implements IMiddlewareExecute {
  private middlewareLike: MiddlewareLike;

  protected __init__() {
    this.middlewareLike = this.bean._newBean(MiddlewareLike, 'guard');
  }

  async execute(_options: IMiddlewareOptionsGuard, next: Next) {
    // todo: support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    // compose
    const result = await this.middlewareLike.composeAsync()(this.ctx);
    if (result === false) this.ctx.throw(403);
    // next
    return next();
  }
}
