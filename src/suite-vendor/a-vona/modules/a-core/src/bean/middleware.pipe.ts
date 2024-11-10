import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsPipe extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsPipe>({ global: true, dependencies: 'a-core:interceptor' })
export class MiddlewarePipe extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsPipe, next: Next) {
    console.log('pipe');
    // support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    // next
    return next();
  }
}
