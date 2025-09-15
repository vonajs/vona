import type { Next } from 'vona';
import type { IDecoratorInterceptorOptions, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsCaptchaVerify extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsCaptchaVerify>()
export class InterceptorCaptchaVerify extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsCaptchaVerify, next: Next) {
    // next
    return next();
  }
}
