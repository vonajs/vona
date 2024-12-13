import { RouteHandlerArgumentMetaDecorator, RouteHandlerArgumentType, VonaContext } from 'vona';

export function extractValue(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
  return exchangeKeyForValue(argMeta.type, argMeta.field, { req: ctx.request, res: ctx.response });
}

export function exchangeKeyForValue(type: RouteHandlerArgumentType, field: string | undefined, { req, res }) {
  const modes = {
    request: () => req,
    response: () => res,
    body: () => (field && req.body ? req.body[field] : req.body),
    query: () => (field ? req.query[field] : req.query),
    param: () => (field ? req.params[field] : req.params),
    headers: () => (field ? req.headers[field.toLowerCase()] : req.headers),
    session: () => req.session,
    file: () => req[field || 'file'],
    files: () => req.files,
    host: () => {
      const hosts = req.hosts || {};
      return field ? hosts[field] : hosts;
    },
    ip: () => req.ip,
    rawBody: () => req.rawBody,
  };
  return modes[type]?.();
}
