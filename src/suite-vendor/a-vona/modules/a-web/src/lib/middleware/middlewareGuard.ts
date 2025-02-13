import type { Next, VonaContext } from 'vona';

export async function middlewareGuard(ctx: VonaContext, next: Next) {
  // check innerAccess
  if (ctx.innerAccess) return next();
  // check handler
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  const result = await ctx.app.bean.onion.guard.compose(ctx)(ctx);
  if (result === false) ctx.app.throw(403);
  // next
  return next();
}
