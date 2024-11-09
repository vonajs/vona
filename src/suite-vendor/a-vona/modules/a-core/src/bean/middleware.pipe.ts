import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsPipe extends IDecoratorMiddlewareOptions {}

@Middleware({ global: true, dependencies: 'a-core:interceptor' } as IMiddlewareOptionsPipe)
export class MiddlewarePipe extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsPipe, next: Next) {
    // next
    return next();
  }
}
