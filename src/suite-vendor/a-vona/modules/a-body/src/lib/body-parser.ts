import type * as Koa from 'koa';
import type { VonaContext } from 'vona';
import type { BodyParserOptions, BodyType } from './body-parser.types.ts';
import parser from 'co-body';
import { getIsEnabledBodyAs, getMimeTypes, isTypes } from './body-parser.utils.ts';

/**
 * Global declaration for the added properties to the 'ctx.request'
 */
declare module 'koa' {
  export interface Request {
    body: any;
    rawBody: string;
  }
}

/**
 * Middleware wrapper which delegate options to the core code
 */
export async function bodyParserWrapper(ctx: VonaContext, opts: BodyParserOptions) {
  const {
    parsedMethods = ['POST', 'PUT', 'PATCH'],
    detectJSON,
    enableTypes = ['json', 'form'],
    extendTypes = {} as NonNullable<BodyParserOptions['extendTypes']>,
    ...restOpts
  } = opts;
  const isEnabledBodyAs = getIsEnabledBodyAs(enableTypes);
  const mimeTypes = getMimeTypes(extendTypes);

  if (
    // method souldn't be parsed
    !parsedMethods.includes(ctx.method.toUpperCase()) ||
    // koa request body already parsed
    ctx.request.body !== undefined
  ) {
    return ctx.request.body;
  }

  // parse
  const response = await parseBody(ctx);
  // patch koa
  ctx.request.body = 'parsed' in response ? response.parsed : {};
  if (ctx.request.rawBody === undefined) ctx.request.rawBody = response.raw;

  async function parseBody(ctx: Koa.Context) {
    const shouldParseBodyAs = (type: BodyType) => {
      return Boolean(
        isEnabledBodyAs[type] &&
        isTypes(ctx.request.get('content-type'), mimeTypes[type]),
      );
    };

    const bodyType =
      detectJSON?.(ctx) || shouldParseBodyAs('json')
        ? 'json'
        : shouldParseBodyAs('form')
          ? 'form'
          : shouldParseBodyAs('text') || shouldParseBodyAs('xml')
            ? 'text'
            : null;

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if (!bodyType) return {} as Record<string, string>;
    const parserOptions = {
      // force co-body return raw body
      returnRawBody: true,
      strict: bodyType === 'json' ? restOpts.jsonStrict : undefined,
      [`${bodyType}Types`]: mimeTypes[bodyType],
      limit: restOpts[`${shouldParseBodyAs('xml') ? 'xml' : bodyType}Limit`],

      encoding: restOpts.encoding || 'utf-8',
    };

    return parser[bodyType](ctx, parserOptions) as Promise<
      Record<string, string>
    >;
  }

  return async function bodyParser(ctx: Koa.Context, next: Koa.Next) {
    try {

    } catch (err: unknown) {
      if (!onError) throw err;
      onError(err as Error, ctx);
    }

    return next();
  };
}
