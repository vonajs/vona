import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsOpenapiSchema extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsOpenapiSchema>({ global: true })
export class InterceptorOpenapiSchema extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsOpenapiSchema, next: Next) {
    const headerOpenapiSchema = this.ctx.headers['x-vona-openapi-schema'];
    if (headerOpenapiSchema !== 'true') return next();
    // openapi-schema
    const body = this.$scope.openapi.service.openapi.generateJsonOfControllerAction(this.ctx.getController()!, this.ctx.getHandlerName() as string);
    this.app.success(body);
  }
}
