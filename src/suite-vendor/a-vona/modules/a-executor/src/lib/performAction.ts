import type { VonaContext } from 'vona';
import type { IPerformActionInnerParams } from '../types/executor.ts';
import http from 'node:http';
import compose from 'koa-compose';
import { cast } from 'vona';
import { delegateProperties } from './utils.ts';

let __fnMiddleware;

export async function performActionInner<T = any>({
  ctxCaller,
  innerAccess,
  method,
  path,
  query,
  body,
  onions,
}: IPerformActionInnerParams): Promise<T> {
  // app
  const app = ctxCaller.app;
  // middleware
  if (!__fnMiddleware) {
    const middleware = app.middleware[app.middleware.length - 1];
    __fnMiddleware = compose([middleware]);
  }
  // request
  const url = app.util.combineApiPath('', path, true, true);
  const req = createRequest({ method, url }, ctxCaller);
  // response
  const res = new http.ServerResponse(req);
  // default status code
  res.statusCode = 404;
  // ctx
  const ctx = app.createContext(req, res) as unknown as VonaContext;
  // run
  return await app.ctxStorage!.run(ctx as any, async () => {
    // locale
    Object.defineProperty(ctx, 'locale', {
      get() {
        return ctxCaller.locale;
      },
    });

    // instanceName
    Object.defineProperty(ctx, 'instanceName', {
      get() {
        return ctxCaller.instanceName;
      },
    });

    // instance
    ctx.instance = ctxCaller.instance;

    // delegateProperties
    delegateProperties(ctx, ctxCaller);

    // query
    if (query !== undefined) {
      cast(ctx.req).query = cast(ctx.request).query = query;
    }
    // body
    cast(ctx.req).body = ctx.request.body = body ?? {}; // body should set {} if undefined/null

    // ctxCaller
    ctx.ctxCaller = ctxCaller;

    // innerAccess
    if (innerAccess !== undefined) ctx.innerAccess = innerAccess;

    // onion
    ctx.onionsDynamic = onions;

    // invoke middleware
    await __fnMiddleware(ctx);
    // check result
    if (ctx.status === 200) {
      if (!ctx.body || (ctx.body as any).code === undefined) {
        // not check code, e.g. text/xml
        return ctx.body;
      }
      if ((ctx.body as any).code === 0) {
        return (ctx.body as any).data;
      }
      throw ctx.app.util.createError(ctx.body);
    } else {
      if (ctx.body && typeof ctx.body === 'object') {
        throw ctx.app.util.createError(ctx.body);
      } else {
        throw ctx.app.util.createError({
          code: ctx.status,
          message: ctx.message,
        });
      }
    }
  });
}

function createRequest({ method, url }, ctxCaller) {
  // _req
  const _req = ctxCaller.request;
  // req
  const req = new http.IncomingMessage(null as any);
  req.headers = Object.assign({}, _req.headers, { accept: 'application/json' });
  (<any>req).host = _req.host;
  (<any>req).hostname = _req.hostname;
  (<any>req).protocol = _req.protocol;
  (<any>req).secure = _req.secure;
  req.method = method.toUpperCase();
  req.url = url;
  // path,
  (<any>req).socket = {
    remoteAddress: _req.socket.remoteAddress,
    remotePort: _req.socket.remotePort,
  };
  return req;
}
