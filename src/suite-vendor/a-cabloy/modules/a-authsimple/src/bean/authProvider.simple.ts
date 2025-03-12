import type { Next } from 'vona';
import type { IAuthProviderExecute, IDecoratorAuthProviderOptions } from 'vona-module-a-auth';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IAuthProviderOptionsSimple extends IDecoratorAuthProviderOptions {}

@Middleware<IAuthProviderOptionsSimple>()
export class MiddlewareSimple extends BeanBase implements IAuthProviderExecute {
  async execute(_options: IAuthProviderOptionsSimple, next: Next) {
    // next
    return next();
  }
}
