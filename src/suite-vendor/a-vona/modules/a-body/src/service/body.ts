import type { IOpenApiOptions, IResponseHeaders, TypeResponseContentType } from 'vona-module-a-openapi';
import type { BodyParserOptions, BodyType } from '../types/bodyParser.ts';
import parser from 'co-body';
import { appMetadata, BeanBase } from 'vona';
import { SymbolOpenApiOptions } from 'vona-module-a-openapi';
import { Service } from 'vona-module-a-bean';
import { getIsEnabledBodyAs, getMimeTypes, isTypes } from '../lib/utils.ts';
import { SymbolDisableBodyParser } from '../types/bodyParser.ts';

@Service()
export class ServiceBody extends BeanBase {
  async parse(check: boolean) {
    const options = this.scope.config.parser;
    const ctx = this.ctx;
    if (ctx.request.body !== undefined) return ctx.request.body;
    if (check) {
      if (!options.parsedMethods.includes(ctx.method.toUpperCase())) return;
      if (ctx[SymbolDisableBodyParser]) return;
    }
    // parse
    const response = await this.parseRaw(options);
    // patch koa
    ctx.request.body = 'parsed' in response ? response.parsed : {};
    if (ctx.request.rawBody === undefined) ctx.request.rawBody = response.raw;
    return ctx.request.body;
  }

  async parseRaw(options: BodyParserOptions) {
    const ctx = this.ctx;
    const isEnabledBodyAs = getIsEnabledBodyAs(options.enableTypes);
    const mimeTypes = getMimeTypes(options.extendTypes);

    const shouldParseBodyAs = (type: BodyType) => {
      return Boolean(
        isEnabledBodyAs[type] &&
        isTypes(ctx.request.get('content-type'), mimeTypes[type]),
      );
    };

    const bodyType =
  options.detectJSON?.(ctx) || shouldParseBodyAs('json')
    ? 'json'
    : shouldParseBodyAs('form')
      ? 'form'
      : shouldParseBodyAs('text') || shouldParseBodyAs('xml')
        ? 'text'
        : null;

    if (!bodyType) return {} as Record<string, string>;
    const parserOptions = {
      // force co-body return raw body
      returnRawBody: true,
      strict: bodyType === 'json' ? options.jsonStrict : undefined,
      [`${bodyType}Types`]: mimeTypes[bodyType],
      limit: options[`${shouldParseBodyAs('xml') ? 'xml' : bodyType}Limit`],
      encoding: options.encoding || 'utf-8',
    };

    return await parser[bodyType](ctx.req, parserOptions);
  }

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
