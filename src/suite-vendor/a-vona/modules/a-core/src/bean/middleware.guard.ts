import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsGuard extends IDecoratorMiddlewareOptions {
  test?: string;
}

@Middleware({ global: true } as IMiddlewareOptionsGuard)
export class MiddlewareGuard extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsGuard, next: Next) {
    console.log(_options.test, 'guard');
    // next
    return next();
  }
}
