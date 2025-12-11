import type { Next, VonaApplication, VonaContext } from 'vona';
import type { ContextRoute } from '../../types/router.ts';
import { SymbolCacheComposeGuards } from 'vona-module-a-aspect';

export async function middlewareGuard(ctx: VonaContext, next: Next) {
  // check handler
  const handler = ctx.getHandler();
  if (!handler) return next();
  // compose
  const result = await _composeGuards(ctx.app, ctx.route)(ctx);
  if (result === false) ctx.app.throw(403);
  // next
  return next();
}

function _composeGuards(app: VonaApplication, route: ContextRoute) {
  // compose
  if (!app.meta[SymbolCacheComposeGuards]) app.meta[SymbolCacheComposeGuards] = {};
  const cacheComposeGuards: Record<string, Function> = app.meta[SymbolCacheComposeGuards];
  const beanFullName = route.controllerBeanFullName;
  const handlerName = route.action;
  const key = `${beanFullName}:${handlerName}`;
  if (!cacheComposeGuards[key]) {
    cacheComposeGuards[key] = app.bean.onion.guard.compose(route);
  }
  return cacheComposeGuards[key];
}
