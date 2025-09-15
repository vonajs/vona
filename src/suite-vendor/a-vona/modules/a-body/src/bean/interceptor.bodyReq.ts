import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsBodyReq extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsBodyReq>({
  global: true,
  dependencies: 'a-openapischema:openapiSchema',
})
export class InterceptorBodyReq extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsBodyReq, next: Next) {
    // next
    return next();
  }
}
