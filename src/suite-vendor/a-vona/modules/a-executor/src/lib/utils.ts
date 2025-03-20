import http from 'node:http';

export function delegateProperties(ctx, ctxCaller) {
  for (const property of ['state']) {
    delegateProperty(ctx, ctxCaller, property);
  }
  for (const property of ['headers']) {
    delegateProperty(ctx.request, ctxCaller.request, property);
    // if (ctx.request[property]) req[property] = ctx.request[property];
  }
}

export function delegateProperty(ctx, ctxCaller, property) {
  if (!ctxCaller[property])ctxCaller[property] = {};
  ctx[property] = ctxCaller[property];
}

export function __createRequest({ method, url }, ctxCaller) {
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

// export function delegateProperty(ctx, ctxCaller, property) {
//   if (!ctxCaller[property]) return;
//   if (!ctx[property]) ctx[property] = {};
//   for (const key in ctxCaller[property]) {
//     ctx[property][key] = ctxCaller[property][key];
//   }
// }

// function _delegateProperty(ctx, ctxCaller, property) {
//   const keyMock = `__executeBean__mock__${property}__`;
//   const keyOriginal = `__executeBean__mock__${property}__original__`;
//   if (['headers'].includes(property)) {
//     ctx[keyOriginal] = ctx[property];
//   }
//   Object.defineProperty(ctx, property, {
//     get() {
//       const value = ctxCaller && ctxCaller[property];
//       if (value) return value;
//       //
//       if (['headers'].includes(property)) {
//         return ctx[keyOriginal];
//       }
//       //
//       if (!ctx[keyMock]) {
//         ctx[keyMock] = {};
//       }
//       return ctx[keyMock];
//     },
//   });
// }
