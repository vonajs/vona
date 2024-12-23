import { URL } from 'url';
import koaCors from '@koa/cors';
import { VonaContext } from 'vona';

module.exports = options => {
  return async function (ctx, next) {
    // not cors (safari not send sec-fetch-mode)
    // if (ctx.headers['sec-fetch-mode'] !== 'cors') return await next();
    if (ctx.innerAccess) return await next();

    let origin = ctx.get('origin');

    if (!origin || origin === 'null') origin = 'null';

    const host = ctx.host;
    if (origin !== 'null' && new URL(origin).host === host) {
      return await next();
    }

    // options
    const optionsCors = Object.assign({}, options);

    // origin
    // if security plugin enabled, and origin config is not provided, will only allow safe domains support CORS.
    optionsCors.origin =
      typeof optionsCors.origin === 'function'
        ? optionsCors.origin
        : function corsOrigin(ctx: VonaContext) {
            // origin is {protocol}{hostname}{port}...
            if (ctx.app.util.isSafeDomain(ctx, origin)) {
              return origin;
            }
            return '';
          };

    // cors
    const fn = koaCors(optionsCors);
    await fn(ctx, next);
  };
};
