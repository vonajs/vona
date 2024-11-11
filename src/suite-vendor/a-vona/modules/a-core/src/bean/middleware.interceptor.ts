import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsInterceptor extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsInterceptor>({ global: true, dependencies: 'a-core:guard' })
export class MiddlewareInterceptor extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsInterceptor, next: Next) {
    console.log('interceptor');
    // todo: support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    // next
    return next();
  }
}
