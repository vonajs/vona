import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { IOpenApiOptions } from 'vona-module-a-openapi';
import type { TypeEventRetrieveOpenapiSchemaData } from './event.retrieveOpenapiSchema.ts';
import { appMetadata, BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';
import { SymbolOpenApiOptions } from 'vona-module-a-openapi';

export interface IInterceptorOptionsOpenapiSchema extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsOpenapiSchema>({ global: true })
export class InterceptorOpenapiSchema extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsOpenapiSchema, next: Next) {
    const headerOpenapiSchema = this.ctx.headers['x-vona-openapi-schema'];
    if (headerOpenapiSchema?.toString() !== 'true') return next();
    // openapi-schema
    const data: TypeEventRetrieveOpenapiSchemaData = { route: this.ctx.route };
    const body = await this.scope.event.retrieveOpenapiSchema.emit(data, async data => {
      // doc
      const doc = this.$scope.openapi.service.openapi.generateJsonOfControllerAction(data.route.controller, data.route.action, 'V31');
      return { doc };
    });
    this.app.success(body);
  }
}
