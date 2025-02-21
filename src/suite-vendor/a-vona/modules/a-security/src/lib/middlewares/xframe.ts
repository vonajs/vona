import type { Next, VonaContext } from 'vona';
import type { IMiddlewareSystemOptionsSecurities } from '../../bean/middlewareSystem.securities.ts';
import { checkIfIgnore } from '../utils.ts';

export default (options: IMiddlewareSystemOptionsSecurities['xframe']) => {
  return async function xframe(ctx: VonaContext, next: Next) {
    await next();

    const opts = {
      ...options,
      ...ctx.securityOptions?.xframe,
    };
    if (checkIfIgnore(opts, ctx)) return;

    // DENY, SAMEORIGIN, ALLOW-FROM
    // https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options?redirectlocale=en-US&redirectslug=The_X-FRAME-OPTIONS_response_header
    const value = opts.value || 'SAMEORIGIN';
    ctx.set('x-frame-options', value);
  };
};
