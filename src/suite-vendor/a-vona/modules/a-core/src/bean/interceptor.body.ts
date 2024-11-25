import { BeanBase, IDecoratorInterceptorOptions, IInterceptorExecute, Interceptor, Next } from 'vona';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsBody>({ global: true })
export class InterceptorBody extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsBody, next: Next) {
    // next
    const res = await next();
    // handle
    if (this.ctx.response.status === 404 && this.ctx.response.body === undefined) {
      this.app.success(res);
    }
    // ok
    return res;
  }
}
