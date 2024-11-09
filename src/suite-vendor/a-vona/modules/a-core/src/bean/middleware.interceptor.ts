import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsInterceptor extends IDecoratorMiddlewareOptions {}

@Middleware({ global: true, dependencies: 'a-core:guard' } as IMiddlewareOptionsInterceptor)
export class MiddlewareInterceptor extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsInterceptor, next: Next) {
    // next
    return next();
  }
}
