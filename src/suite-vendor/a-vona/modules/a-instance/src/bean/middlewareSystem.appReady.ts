import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsAppReady extends IDecoratorMiddlewareSystemOptions {}

@MiddlewareSystem<IMiddlewareSystemOptionsAppReady>({
  dependencies: 'a-core:overrideMethod',
})
export class MiddlewareSystemAppReady extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsAppReady, next: Next) {
    // check appReady
    if (!this.ctx.innerAccess) {
      await this.scope.service.instance.checkAppReady();
    }
    // next
    return next();
  }
}
