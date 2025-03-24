import type { VonaContext } from 'vona';
import type { RouteHandlerArgumentMetaDecorator, RouteHandlerArgumentType } from 'vona-module-a-openapi';
import type { IUploadValue } from 'vona-module-a-upload';
import { SymbolUploadValue } from 'vona-module-a-upload';

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
    param: () => (field ? req.params[field] : req.params),
    headers: () => (field ? req.headers[field.toLowerCase()] : req.headers),
    host: () => {
      const hosts = req.hosts || {};
      return field ? hosts[field] : hosts;
    },
    ip: () => req.ip,
    rawBody: () => req.rawBody,
    user: () => ctx.app.bean.passport.getCurrentUser(),
    fields: () => {
      const uploadValue: IUploadValue = ctx[SymbolUploadValue];
      if (!uploadValue) throw new Error('should use interceptor: a-upload:upload');
      return field ? uploadValue.fields.find(item => item.name === field)?.value : uploadValue.fields;
    },
    files: () => {
      const uploadValue: IUploadValue = ctx[SymbolUploadValue];
      if (!uploadValue) throw new Error('should use interceptor: a-upload:upload');
      return field ? uploadValue.files.find(item => item.name === field) : uploadValue.files;
    },
  };
  return modes[type]?.();
}
