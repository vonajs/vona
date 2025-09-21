import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsBodyRes extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsBodyRes>({ global: true, dependencies: 'a-body:bodyReq' })
export class InterceptorBodyRes extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsBodyRes, next: Next) {
    // next
    const res = await next();
    // handle
    if (this.ctx.response.status === 404 && this.ctx.response.body === undefined) {
      await this.bean.bodyRes.setHeaders();
      await this.bean.bodyRes.respond(res);
    }
    // ok
    return res;
  }
}
