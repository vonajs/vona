import { Next, VonaContext } from 'vona';
import { IMiddlewareSystemOptionsSecurities } from '../../bean/middlewareSystem.securities.js';
import { checkIfIgnore } from '../utils.js';

// @see http://blogs.msdn.com/b/ieinternals/archive/2009/06/30/internet-explorer-custom-http-headers.aspx
export default (options: IMiddlewareSystemOptionsSecurities['noopen']) => {
  return async function noopen(ctx: VonaContext, next: Next) {
    await next();

    const opts = {
      ...options,
      ...ctx.securityOptions?.noopen,
    };
    if (checkIfIgnore(opts, ctx)) return;

    ctx.set('x-download-options', 'noopen');
  };
};
