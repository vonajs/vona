import type { Next, VonaContext } from 'vona';
import type { IMiddlewareSystemOptionsSecurities } from '../../bean/middlewareSystem.securities.ts';
import { checkIfIgnore } from '../utils.ts';

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
