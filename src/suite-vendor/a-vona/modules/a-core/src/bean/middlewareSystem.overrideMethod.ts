import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';
import overrideMethod from 'koa-override';

export interface IMiddlewareSystemOptionsOverrideMethod extends IDecoratorMiddlewareSystemOptions {
  allowedMethods?: string[];
}

@MiddlewareSystem<IMiddlewareSystemOptionsOverrideMethod>({
  dependencies: 'a-core:bodyparser',
  allowedMethods: ['POST'],
})
export class MiddlewareSystemOverrideMethod extends BeanBase implements IMiddlewareSystemExecute {
  private _overrideMethod: any;

  async execute(options: IMiddlewareSystemOptionsOverrideMethod, next: Next) {
    if (!this._overrideMethod) {
      this._overrideMethod = overrideMethod(options);
    }
    return this._overrideMethod(this.ctx, next);
  }
}
