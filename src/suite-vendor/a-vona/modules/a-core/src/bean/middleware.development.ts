import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsDevelopment extends IDecoratorMiddlewareOptions {}

@Middleware({} as IMiddlewareOptionsDevelopment)
export class MiddlewareDevelopment extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsDevelopment, next: Next) {
    if (this.app.meta.isProd) this.ctx.throw(403);
    // next
    return next();
  }
}
