import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsTransaction extends IDecoratorMiddlewareOptions {}

@Middleware({} as IMiddlewareOptionsTransaction)
export class MiddlewareTransaction extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsTransaction, next: Next) {
    // next
    return next();
  }
}
