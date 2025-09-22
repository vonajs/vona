import type { Next } from 'vona';
import type { IDecoratorInterceptorOptions, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsSerializerTransform extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsSerializerTransform>()
export class InterceptorSerializerTransform extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsSerializerTransform, next: Next) {
    // next
    const body = await next();
    // schema
    const schema = this.bean.bodyRes.getResponseBodySchema();
    // transform
    return await this.bean.serializer.transform(body, schema);
  }
}
