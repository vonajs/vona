import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { IRecordResourceNameToRoutePathItem } from 'vona-module-a-web';
import type { TypeEventRetrieveOpenapiSchemaData } from './event.retrieveOpenapiSchema.ts';
import { $customKey, BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';
import { recordResourceNameToRoutePath } from 'vona-module-a-web';

export interface IInterceptorOptionsOpenapiSchema extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsOpenapiSchema>({ global: true })
export class InterceptorOpenapiSchema extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsOpenapiSchema, next: Next) {
    const headerOpenapiSchema = this.ctx.headers[$customKey('x-vona-openapi-schema')];
    if (headerOpenapiSchema?.toString() !== 'true') return next();
    // openapi-schema
    let body;
    if (this.ctx.route.routePath === '/api/openapischema/resource/bootstrap/:resource') {
      const resource = this.ctx.request.params.resource;
      const routePathInfo: IRecordResourceNameToRoutePathItem = recordResourceNameToRoutePath[resource];
      if (!routePathInfo) throw new Error(`not found routePath of resource: ${resource}`);
      const authToken = this.bean.jwt.extractAuthTokenFromAllWays();
      const data = await this.bean.executor.performAction('get', routePathInfo.routePathRaw as any, {
        innerAccess: false,
        authToken,
        headers: {
          [$customKey('x-vona-openapi-schema')]: true,
        },
      });
      body = Object.assign({}, data, { api: routePathInfo.apiPath });
    } else {
      const data: TypeEventRetrieveOpenapiSchemaData = { route: this.ctx.route };
      body = await this.scope.event.retrieveOpenapiSchema.emit(data, async data => {
        // doc
        const doc = await this.bean.openapi.generateJsonOfControllerAction(data.route.controller, data.route.action, 'V31');
        return { doc };
      });
    }
    this.app.success(body);
  }
}
