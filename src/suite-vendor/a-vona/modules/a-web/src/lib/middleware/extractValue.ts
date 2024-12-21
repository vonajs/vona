import { VonaContext } from 'vona';
import { RouteHandlerArgumentMetaDecorator, RouteHandlerArgumentType } from 'vona-module-a-aspect';

export function extractValue(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
  return exchangeKeyForValue(ctx, argMeta.type, argMeta.field);
}

export function exchangeKeyForValue(ctx: VonaContext, type: RouteHandlerArgumentType, field: string | undefined) {
  const req = ctx.request as any;
  const res = ctx.response as any;
  const modes = {
    request: () => req,
    response: () => res,
    body: () => (field && req.body ? req.body[field] : req.body),
    query: () => (field ? req.query[field] : req.query),
    param: () => (field ? ctx.params[field] : ctx.params),
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
    user: () => ctx.app.bean.passport.getCurrent(),
  };
  return modes[type]?.();
}
