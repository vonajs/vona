import http from 'http';
import compose from 'koa-compose';
import { IPerformActionInnerParams } from '../types/executor.js';
import { cast, VonaContext } from 'vona';

let __fnMiddleware;

export async function performActionInner<T = any>({
  ctxCaller,
  innerAccess,
  // subdomain, deprecated
  method,
  path,
  query,
  headers,
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
  const url = app.meta.util.combineApiPath('', path, true, true);
  const req = createRequest({ method, url }, ctxCaller);
  // response
  const res = new http.ServerResponse(req);
  // default status code
  res.statusCode = 404;
  // ctx
  const ctx = app.createContext(req, res) as unknown as VonaContext;
  // run
  return await app.ctxStorage.run(ctx as any, async () => {
    // locale
    Object.defineProperty(ctx, 'locale', {
      get() {
        return ctxCaller.locale;
      },
    });

    // subdomain
    Object.defineProperty(ctx, 'subdomain', {
      get() {
        return ctxCaller.subdomain;
      },
    });

    // query body
    if (query !== undefined) {
      cast(ctx.req).query = cast(ctx.request).query = query;
    }
    cast(ctx.req).body = ctx.request.body = body;

    // headers
    delegateHeaders(ctx, ctxCaller, headers);

    // multipart
    ctx.multipart = function (options) {
      return ctxCaller.multipart(options);
    };

    // cookies
    delegateCookies(ctx, ctxCaller);

    // todo: remove session
    // XX should not delegate session, because session._ctx related to ctx
    // not delegate ctx.user, because will create req.user by state.user
    for (const property of ['state', 'socket', 'session', 'instance']) {
      delegateProperty(ctx, ctxCaller, property);
    }

    // ctxCaller
    ctx.ctxCaller = ctxCaller;

    // innerAccess
    if (innerAccess !== undefined) ctx.innerAccess = innerAccess;

    // onion
    ctx.meta.onionsDynamic = onions;

    // invoke middleware
    await __fnMiddleware(ctx);
    // check result
    if (ctx.status === 200) {
      if (!ctx.body || ctx.body.code === undefined) {
        // not check code, e.g. text/xml
        return ctx.body;
      }
      if (ctx.body.code === 0) {
        return ctx.body.data;
      }
      throw ctx.app.meta.util.createError(ctx.body);
    } else {
      if (ctx.body && typeof ctx.body === 'object') {
        throw ctx.app.meta.util.createError(ctx.body);
      } else {
        throw ctx.app.meta.util.createError({
          code: ctx.status,
          message: ctx.message,
        });
      }
    }
  });
}

function delegateHeaders(ctx, ctxCaller, headers) {
  if (ctxCaller && ctxCaller.headers) {
    Object.assign(ctx.headers, ctxCaller.headers);
  }
  if (headers) {
    Object.assign(ctx.headers, headers);
  }
}

function delegateCookies(ctx, ctxCaller) {
  const _cookies = ctx.cookies;
  Object.defineProperty(ctx, 'cookies', {
    get() {
      return ctxCaller.cookies || _cookies;
    },
  });
}

function delegateProperty(ctx, ctxCaller, property) {
  Object.defineProperty(ctx, property, {
    get() {
      return ctxCaller[property];
    },
  });
}

function createRequest({ method, url }, ctxCaller) {
  // _req
  const _req = ctxCaller.request;
  // req
  const req = new http.IncomingMessage(null as any);
  req.headers = _req.headers;
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
