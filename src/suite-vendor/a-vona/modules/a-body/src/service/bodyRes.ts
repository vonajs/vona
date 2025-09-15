import type { IOpenApiOptions, IResponseHeaders, TypeResponseContentType } from 'vona-module-a-openapiutils';
import { appMetadata, BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { SymbolOpenApiOptions } from 'vona-module-a-openapiutils';

@Service()
export class ServiceBodyRes extends BeanBase {
  async setHeaders() {
    const headers = this.getResponseHeaders();
    if (!headers) return;
    this.ctx.set(headers);
  }

  async respond(body: any, contentType?: TypeResponseContentType, httpCode?: number) {
    if (!httpCode) httpCode = this.getResponseHttpCode(200);
    if (!contentType) contentType = this.getResponseContentType();
    if (contentType === 'application/json') {
      this.app.success(body);
      this.ctx.response.status = httpCode;
    } else {
      this.ctx.response.status = httpCode;
      this.ctx.response.type = contentType;
      this.ctx.response.body = body;
    }
  }

  getResponseHeaders(): IResponseHeaders | undefined {
    const controller = this.ctx.getController();
    if (controller) {
      const handlerName = this.ctx.getHandlerName();
      const options = appMetadata.getMetadata<IOpenApiOptions>(SymbolOpenApiOptions, controller.prototype, handlerName);
      return options?.setHeaders;
    }
  }

  getResponseHttpCode(defaultCode: number = 200): number {
    let httpCode: number | undefined;
    const controller = this.ctx.getController();
    if (controller) {
      const handlerName = this.ctx.getHandlerName();
      const options = appMetadata.getMetadata<IOpenApiOptions>(SymbolOpenApiOptions, controller.prototype, handlerName);
      httpCode = options?.httpCode;
    }
    return httpCode ?? defaultCode;
  }

  getResponseContentType(): TypeResponseContentType {
    const controller = this.ctx.getController();
    if (controller) {
      const handlerName = this.ctx.getHandlerName();
      const options = appMetadata.getMetadata<IOpenApiOptions>(SymbolOpenApiOptions, controller.prototype, handlerName);
      const contentType = options?.contentType;
      if (contentType) return contentType;
    }
    if (this.ctx.acceptJSON) return 'application/json';
    if (this.ctx.accepts('html') === 'html') return 'text/html';
    return 'application/octet-stream';
  }
}
