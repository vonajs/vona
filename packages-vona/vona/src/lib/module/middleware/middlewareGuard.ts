import { VonaContext } from '../../../types/context/index.js';
import { Next } from '../../../types/interface/middleware.js';

export async function middlewareGuard(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  const result = await ctx.app.meta.onionGuard.composeAsync(ctx)(ctx);
  if (result === false) ctx.throw(403);
  // next
  return next();
}
