import { Next, VonaContext } from 'vona';

export async function middlewareInterceptor(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  return await ctx.app.meta.onionInterceptor.composeAsync(ctx)(ctx, next);
}
