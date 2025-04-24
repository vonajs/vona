import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsBody>({ global: true, dependencies: 'a-openapi:openapiSchema' })
export class InterceptorBody extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsBody, next: Next) {
    // next
    const res = await next();
    // handle
    if (this.ctx.response.status === 404 && this.ctx.response.body === undefined) {
      await this.scope.service.body.respond(res);
    }
    // ok
    return res;
  }
}
