import { VonaContext } from '../../../types/context/index.js';
import { Next } from '../../../types/interface/middleware.js';

export async function middlewareInterceptor(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  return await ctx.app.meta.onionInterceptor.composeAsync(ctx)(ctx, next);
}
