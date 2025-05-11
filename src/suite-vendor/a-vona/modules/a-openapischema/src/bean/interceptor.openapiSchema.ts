import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { TypeEventRetrieveOpenapiSchemaData } from './event.retrieveOpenapiSchema.ts';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsOpenapiSchema extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsOpenapiSchema>({ global: true })
export class InterceptorOpenapiSchema extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsOpenapiSchema, next: Next) {
    const headerOpenapiSchema = this.ctx.headers['x-vona-openapi-schema'];
    if (headerOpenapiSchema !== 'true') return next();
    // openapi-schema
    const data: TypeEventRetrieveOpenapiSchemaData = {
      controller: this.ctx.getController()!,
      handlerName: this.ctx.getHandlerName() as string,
    };
    const body = await this.scope.event.retrieveOpenapiSchema.emit(data, async data => {
      const doc = this.$scope.openapi.service.openapi.generateJsonOfControllerAction(data.controller, data.handlerName, 'V31');
      return { doc };
    });
    this.app.success(body);
  }
}
