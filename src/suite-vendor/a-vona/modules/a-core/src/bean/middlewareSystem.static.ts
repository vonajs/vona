import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsStatic extends IDecoratorMiddlewareSystemOptions {}

@MiddlewareSystem<IMiddlewareSystemOptionsStatic>({ dependencies: 'a-core:notfound' })
export class MiddlewareSystemStatic extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsStatic, next: Next) {
    // next
    return next();
  }
}
