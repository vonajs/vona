import type { VonaApplication } from 'vona';
import type { ContextRoute } from '../types/router.ts';

export const SymbolCacheControllerRoutes = Symbol('SymbolCacheControllerRoutes');

export function getCacheControllerRoutes(app: VonaApplication): Record<string, ContextRoute[]> {
  if (!app.meta[SymbolCacheControllerRoutes]) app.meta[SymbolCacheControllerRoutes] = {};
  return app.meta[SymbolCacheControllerRoutes];
}
