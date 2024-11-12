import { IRouteHandlerArgumentMeta, RouteParamTypes, VonaContext } from 'vona';

export function extractValue(ctx: VonaContext, argMeta: IRouteHandlerArgumentMeta) {
  return exchangeKeyForValue(argMeta.type, argMeta.field, { req: ctx.request, res: ctx.response });
}

export function exchangeKeyForValue(type: RouteParamTypes, field, { req, res }) {
  switch (type) {
    case RouteParamTypes.NEXT:
      return undefined;
    case RouteParamTypes.REQUEST:
      return req;
    case RouteParamTypes.RESPONSE:
      return res;
    case RouteParamTypes.BODY:
      return field && req.body ? req.body[field] : req.body;
    case RouteParamTypes.RAW_BODY:
      return req.rawBody;
    case RouteParamTypes.PARAM:
      return field ? req.params[field] : req.params;
    case RouteParamTypes.HOST:
      const hosts = req.hosts || {};
      return field ? hosts[field] : hosts;
    case RouteParamTypes.QUERY:
      return field ? req.query[field] : req.query;
    case RouteParamTypes.HEADERS:
      return field ? req.headers[field.toLowerCase()] : req.headers;
    case RouteParamTypes.SESSION:
      return req.session;
    case RouteParamTypes.FILE:
      return req[field || 'file'];
    case RouteParamTypes.FILES:
      return req.files;
    case RouteParamTypes.IP:
      return req.ip;
    default:
      return undefined;
  }
}
