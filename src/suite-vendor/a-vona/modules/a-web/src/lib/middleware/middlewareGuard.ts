import { Next, VonaContext } from 'vona';

export async function middlewareGuard(ctx: VonaContext, next: Next) {
  // check innerAccess
  if (ctx.innerAccess) return next();
  // todo: support fromConfig(handler not found for fromConfig)
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  const result = await ctx.app.bean.onion.guard.composeAsync(ctx)(ctx);
  if (result === false) ctx.app.throw(403);
  // next
  return next();
}
