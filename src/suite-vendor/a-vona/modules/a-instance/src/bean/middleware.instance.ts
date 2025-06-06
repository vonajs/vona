import type { Next } from 'vona';
import type { IDecoratorMiddlewareOptionsGlobal, IMiddlewareExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsInstance extends IDecoratorMiddlewareOptionsGlobal {}

@Middleware<IMiddlewareOptionsInstance>({ global: true, dependencies: 'a-core:gate' })
export class MiddlewareInstance extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsInstance, next: Next) {
    // init instance
    await this.scope.service.instance.initInstance();
    // next
    return next();
  }
}
