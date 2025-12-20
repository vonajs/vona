import type { VonaApplication } from 'vona';
import type { IControllerRecord } from '../types/controller.ts';
import type { ContextRoute } from '../types/router.ts';

export const SymbolCacheControllerRoutes = Symbol('SymbolCacheControllerRoutes');
export const SymbolControllerOptionsResource = Symbol('SymbolControllerOptionsResource');
export const recordResourceNameToPath: Record<keyof IControllerRecord, string> = {} as any;

export function getCacheControllerRoutes(app: VonaApplication): Record<string, ContextRoute[]> {
  if (!app.meta[SymbolCacheControllerRoutes]) app.meta[SymbolCacheControllerRoutes] = {};
  return app.meta[SymbolCacheControllerRoutes];
}
