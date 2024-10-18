import { Bean, BeanBase } from 'vona';

import { URL } from 'url';

import koaCors from '@koa/cors';

const optionsDefault = {
  // origin: undefined,
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // exposeHeaders: '',
  // allowHeaders: '',
  // maxAge: 0,
  credentials: true,
  // keepHeadersOnError:undefined,
};

@Bean({ scene: 'middleware' })
export class MiddlewareCors extends BeanBase {
  async execute(options, next) {
    // not cors (safari not send sec-fetch-mode)
    // if (this.ctx.headers['sec-fetch-mode'] !== 'cors') return await next();
    if (this.ctx.innerAccess) return await next();

    let origin = this.ctx.get('origin');

    if (!origin || origin === 'null') origin = 'null';

    const host = this.ctx.host;
    if (origin !== 'null' && new URL(origin).host === host) {
      return await next();
    }

    // options
    const optionsCors = this.ctx.bean.util.extend({}, optionsDefault, options);

    // origin
    // if security plugin enabled, and origin config is not provided, will only allow safe domains support CORS.
    optionsCors.origin =
      optionsCors.origin ||
      function corsOrigin(ctx) {
        // origin is {protocol}{hostname}{port}...
        if (ctx.app.meta.util.isSafeDomain(ctx, origin)) {
          return origin;
        }
        return '';
      };

    // cors
    const fn = koaCors(optionsCors);
    await fn(this.ctx, next);
  }
}
