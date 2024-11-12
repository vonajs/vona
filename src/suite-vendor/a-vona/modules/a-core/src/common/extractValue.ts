import { IRouteHandlerArgumentMeta, RouteParamtypes, VonaContext } from 'vona';

export function extractValue(ctx: VonaContext, argMeta: IRouteHandlerArgumentMeta) {
  return exchangeKeyForValue(argMeta.type, argMeta.field, { req: ctx.request, res: ctx.response });
}

export function exchangeKeyForValue(type: RouteParamtypes, field, { req, res }) {
  switch (type) {
    case RouteParamtypes.NEXT:
      return undefined;
    case RouteParamtypes.REQUEST:
      return req;
    case RouteParamtypes.RESPONSE:
      return res;
    case RouteParamtypes.BODY:
      return field && req.body ? req.body[field] : req.body;
    case RouteParamtypes.RAW_BODY:
      return req.rawBody;
    case RouteParamtypes.PARAM:
      return field ? req.params[field] : req.params;
    case RouteParamtypes.HOST:
      const hosts = req.hosts || {};
      return field ? hosts[field] : hosts;
    case RouteParamtypes.QUERY:
      return field ? req.query[field] : req.query;
    case RouteParamtypes.HEADERS:
      return field ? req.headers[field.toLowerCase()] : req.headers;
    case RouteParamtypes.SESSION:
      return req.session;
    case RouteParamtypes.FILE:
      return req[field || 'file'];
    case RouteParamtypes.FILES:
      return req.files;
    case RouteParamtypes.IP:
      return req.ip;
    default:
      return undefined;
  }
}
