import type { VonaContext } from 'vona';
import type { BodyParserOptions, BodyType } from './body-parser.types.ts';
import parser from 'co-body';
import { getIsEnabledBodyAs, getMimeTypes, isTypes } from './body-parser.utils.ts';

declare module 'koa' {
  export interface Request {
    body: any;
    rawBody: string;
  }
}

export async function bodyParserWrapper(ctx: VonaContext, options: BodyParserOptions) {
  if (ctx.request.body !== undefined) {
    return ctx.request.body;
  }
  if (!options.parsedMethods.includes(ctx.method.toUpperCase())) return;
  // parse
  const response = await parseBody(ctx, options);
  // patch koa
  ctx.request.body = 'parsed' in response ? response.parsed : {};
  if (ctx.request.rawBody === undefined) ctx.request.rawBody = response.raw;
  return ctx.request.body;
}

async function parseBody(ctx: VonaContext, options: BodyParserOptions) {
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

  return parser[bodyType](ctx, parserOptions) as Promise<
    Record<string, string>
  >;
}
