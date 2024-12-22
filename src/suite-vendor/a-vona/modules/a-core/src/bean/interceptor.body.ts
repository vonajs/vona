import { BeanBase, Next } from 'vona';
import { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute, Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptionsGlobal {}

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

  private _output(body: any) {
    this.ctx.response.status = 200;
    this.ctx.response.type = 'application/json';
    this.ctx.response.body = { code: 0, message: body.message, body };
  }
}
