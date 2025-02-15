import type { Next, VonaContext } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import koaCors from '@koa/cors';
import { BeanBase } from 'vona';
import { MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsCors extends IDecoratorMiddlewareSystemOptions {
  whiteList: string | string[];
  origin: Function;
  allowMethods: string;
  exposeHeaders: string;
  allowHeaders: string;
  maxAge: string;
  credentials: boolean;
  keepHeadersOnError: boolean;
  secureContext: boolean;
  privateNetworkAccess: boolean;
}

@MiddlewareSystem<IMiddlewareSystemOptionsCors>({
  dependencies: 'a-instance:instance',
  whiteList: '*',
  origin: _corsOrigin,
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  exposeHeaders: '',
  allowHeaders: '',
  maxAge: '',
  credentials: true,
  keepHeadersOnError: false,
  secureContext: false,
  privateNetworkAccess: false,
})
export class MiddlewareSystemCors extends BeanBase implements IMiddlewareSystemExecute {
  private _cors: any;
  async execute(options: IMiddlewareSystemOptionsCors, next: Next) {
    if (!this._cors) {
      this._cors = koaCors(options);
    }
    const ctx = this.ctx;
    // not cors (safari not send sec-fetch-mode)
    // if (ctx.headers['sec-fetch-mode'] !== 'cors') return await next();
    if (ctx.innerAccess) return next();

    let origin = ctx.get('origin');
    if (!origin || origin === 'null') origin = 'null';

    const host = ctx.host;
    if (origin !== 'null' && new URL(origin).host === host) {
      return next();
    }

    // next
    return this._cors(this.ctx, next);
  }
}

function _corsOrigin(ctx: VonaContext) {
  let origin = ctx.get('origin');
  if (!origin || origin === 'null') origin = 'null';
  // origin is {protocol}{hostname}{port}...
  if (ctx.app.bean.security.isSafeDomain(origin)) {
    return origin;
  }
  return '';
}
