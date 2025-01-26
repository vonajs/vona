import { checkIfIgnore } from '../utils.js';
import { IMiddlewareSystemOptionsSecurities } from '../../bean/middlewareSystem.securities.js';
import { Next, VonaContext } from 'vona';

export default (options: IMiddlewareSystemOptionsSecurities['xssProtection']) => {
  return async function xssProtection(ctx: VonaContext, next: Next) {
    await next();

    const opts = {
      ...options,
      ...ctx.securityOptions?.xssProtection,
    };
    if (checkIfIgnore(opts, ctx)) return;

    ctx.set('x-xss-protection', opts.value);
  };
};
