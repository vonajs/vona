import type { Next } from 'vona';
import type { IDecoratorMiddlewareOptions, IMiddlewareExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsSimple extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsSimple>()
export class MiddlewareSimple extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsSimple, next: Next) {
    // next
    return next();
  }
}
