import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsGuard extends IDecoratorMiddlewareOptions {
  test: string;
}

@Middleware({} as IMiddlewareOptionsGuard)
export class MiddlewareGuard extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsGuard, next: Next) {
    // next
    return next();
  }
}
