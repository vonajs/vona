import { isSafePath } from '../utils.js';
import type { Next, VonaContext } from 'vona';

// https://en.wikipedia.org/wiki/Directory_traversal_attack
export default () => {
  return function dta(ctx: VonaContext, next: Next) {
    const path = ctx.path;
    if (!isSafePath(path, ctx)) {
      ctx.throw(400);
    }
    return next();
  };
};
