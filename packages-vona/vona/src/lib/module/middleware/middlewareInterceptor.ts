import { VonaContext } from '../../../types/context/index.js';
import { Next } from '../../../types/interface/middleware.js';

export async function middlewareInterceptor(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  const res = await ctx.app.meta.middlewaresInterceptor.composeAsync()(ctx, () => {
    return next();
  });
  if (ctx.response.status === 404 && ctx.response.body === undefined) {
    ctx.success(res);
  }
}
