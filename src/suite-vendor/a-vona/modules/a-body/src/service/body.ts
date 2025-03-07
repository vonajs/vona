import type { BodyParserOptions, BodyType } from '../types/bodyParser.ts';
import parser from 'co-body';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { getIsEnabledBodyAs, getMimeTypes, isTypes } from '../lib/utils.ts';
import { SymbolDisableBodyParser } from '../types/bodyParser.ts';

@Service()
export class ServiceBody extends BeanBase {
  async parse() {
    const options = this.scope.config.parser;
    const ctx = this.ctx;
    if (ctx.request.body !== undefined) return ctx.request.body;
    if (!options.parsedMethods.includes(ctx.method.toUpperCase())) return;
    if (ctx[SymbolDisableBodyParser]) return;
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

    return await parser[bodyType](ctx, parserOptions);
  }
}
