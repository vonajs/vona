import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsSerializerTransform extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsSerializerTransform>({
  global: true,
  dependencies: 'a-body:bodyReq',
})
export class InterceptorSerializerTransform extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsSerializerTransform, next: Next) {
    this.bean.onion.interceptor.inspect();
    // next
    const body = await next();
    if (!body) return body;
    // schema
    const schema = this.bean.bodyRes.getResponseBodySchema();
    console.log(body);
    return body;
  }
}
