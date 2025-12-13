import type { VonaApplication } from 'vona';

export const SymbolCacheComposeMiddlewareSystems = Symbol('SymbolCacheComposeMiddlewareSystems');
export const SymbolCacheComposeMiddlewares = Symbol('SymbolCacheComposeMiddlewares');
export const SymbolCacheComposeGuards = Symbol('SymbolCacheComposeGuards');
export const SymbolCacheComposeInterceptors = Symbol('SymbolCacheComposeInterceptors');
export const SymbolCacheComposePipes = Symbol('SymbolCacheComposePipes');
export const SymbolCacheComposeFilters = Symbol('SymbolCacheComposeFilters');

export function clearCacheComposesAll(app: VonaApplication) {
  delete app.meta[SymbolCacheComposeMiddlewareSystems];
  app.bean.onion.middlewareSystem.clearCache();
  clearCacheComposesRouter(app);
}

export function clearCacheComposesRouter(app: VonaApplication) {
  delete app.meta[SymbolCacheComposeMiddlewares];
  delete app.meta[SymbolCacheComposeGuards];
  delete app.meta[SymbolCacheComposeInterceptors];
  delete app.meta[SymbolCacheComposePipes];
  delete app.meta[SymbolCacheComposeFilters];

  app.bean.onion.middleware.clearCache();
  app.bean.onion.guard.clearCache();
  app.bean.onion.interceptor.clearCache();
  app.bean.onion.pipe.clearCache();
  app.bean.onion.filter.clearCache();
}
