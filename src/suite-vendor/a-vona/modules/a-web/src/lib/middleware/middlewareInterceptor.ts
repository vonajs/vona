import { Next, VonaContext } from 'vona';

export async function middlewareInterceptor(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  return await ctx.app.bean.onion.interceptor.compose(ctx)(ctx, next);
}
