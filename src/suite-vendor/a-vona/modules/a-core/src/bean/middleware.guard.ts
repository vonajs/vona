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
    //this.middlewareLike.
    // next
    return next();
  }
}
