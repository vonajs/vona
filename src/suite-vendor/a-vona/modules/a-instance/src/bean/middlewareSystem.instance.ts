import type { Next } from 'vona';
import { BeanBase } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import { MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsInstance extends IDecoratorMiddlewareSystemOptions {}

@MiddlewareSystem<IMiddlewareSystemOptionsInstance>({
  dependencies: 'a-instance:appReady',
})
export class MiddlewareSystemInstance extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsInstance, next: Next) {
    // init instance
    await this.scope.service.instance.initInstance();
    // next
    return next();
  }
}
