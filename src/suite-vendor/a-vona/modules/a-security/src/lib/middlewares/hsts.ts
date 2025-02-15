import { checkIfIgnore } from '../utils.js';
import type { IMiddlewareSystemOptionsSecurities } from '../../bean/middlewareSystem.securities.js';
import type { Next, VonaContext } from 'vona';

// Set Strict-Transport-Security header
export default (options: IMiddlewareSystemOptionsSecurities['hsts']) => {
  return async function hsts(ctx: VonaContext, next: Next) {
    await next();

    const opts = {
      ...options,
      ...ctx.securityOptions?.hsts,
    };
    if (checkIfIgnore(opts, ctx)) return;

    let val = 'max-age=' + opts.maxAge;
    // If opts.includeSubdomains is defined,
    // the rule is also valid for all the sub domains of the website
    if (opts.includeSubdomains) {
      val += '; includeSubdomains';
    }
    ctx.set('strict-transport-security', val);
  };
};
