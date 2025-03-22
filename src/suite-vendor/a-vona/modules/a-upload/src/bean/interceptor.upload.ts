import type { Next } from 'vona';
import type { IDecoratorInterceptorOptions, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsUpload extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsUpload>()
export class InterceptorUpload extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsUpload, next: Next) {
    // next
    return next();
  }
}
