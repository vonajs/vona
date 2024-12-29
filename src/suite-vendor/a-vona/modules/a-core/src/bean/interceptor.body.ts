import { appMetadata, BeanBase, Next } from 'vona';
import { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute, Interceptor } from 'vona-module-a-aspect';
import { IOpenApiOptions, SymbolOpenApiOptions, TypeResponseContentType } from 'vona-module-a-openapi';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsBody>({ global: true })
export class InterceptorBody extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsBody, next: Next) {
    // next
    const res = await next();
    // handle
    if (this.ctx.response.status === 404 && this.ctx.response.body === undefined) {
      this._output(res);
    }
    // ok
    return res;
  }

  private _output(body: any) {
    const contentType = this._prepareContentType();
    if (contentType === 'application/json') {
      this.app.success(body);
    } else {
      this.ctx.response.status = 200;
      this.ctx.response.type = contentType;
      this.ctx.response.body = body;
    }
  }

  private _prepareContentType(): TypeResponseContentType {
    const controller = this.ctx.getController();
    if (controller) {
      const handlerName = this.ctx.getHandlerName();
      const options = appMetadata.getMetadata<IOpenApiOptions>(SymbolOpenApiOptions, controller.prototype, handlerName);
      const contentType = options?.contentType;
      if (contentType) return contentType;
    }
    if (this.ctx.accepts('json') === 'json') return 'application/json';
    if (this.ctx.accepts('html') === 'html') return 'text/html';
    return 'application/octet-stream';
  }
}
