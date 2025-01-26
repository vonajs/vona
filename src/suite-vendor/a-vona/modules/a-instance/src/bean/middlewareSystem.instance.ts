import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';

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
