import type { VonaApplication } from 'vona';
import type { ContextRoute } from '../../types/router.ts';
import { SymbolCacheComposeGuards } from 'vona-module-a-aspect';

export function composeGuards(app: VonaApplication, route: ContextRoute) {
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
