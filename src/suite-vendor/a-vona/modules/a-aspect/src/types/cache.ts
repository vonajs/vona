import type { VonaApplication } from 'vona';

export const SymbolCacheMiddlewareSystems = Symbol('SymbolCacheMiddlewareSystems');
export const SymbolCacheComposeMiddlewares = Symbol('SymbolCacheComposeMiddlewares');
export const SymbolCacheComposeGuards = Symbol('SymbolCacheComposeGuards');
export const SymbolCacheComposeInterceptors = Symbol('SymbolCacheComposeInterceptors');
export const SymbolCacheComposePipes = Symbol('SymbolCacheComposePipes');
export const SymbolCacheComposeFilters = Symbol('SymbolCacheComposeFilters');

export function clearAllCacheComposes(app: VonaApplication) {
  delete app.meta[SymbolCacheMiddlewareSystems];
  delete app.meta[SymbolCacheComposeMiddlewares];
  delete app.meta[SymbolCacheComposeGuards];
  delete app.meta[SymbolCacheComposeInterceptors];
  delete app.meta[SymbolCacheComposePipes];
  delete app.meta[SymbolCacheComposeFilters];
}
