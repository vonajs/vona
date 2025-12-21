import type { VonaApplication } from 'vona';
import type { IControllerRecord } from '../types/controller.ts';
import type { ContextRoute } from '../types/router.ts';

export interface IRecordResourceNameToRoutePathItem {
  apiPath: string;
  routePathRaw: string;
}

export const SymbolCacheControllerRoutes = Symbol('SymbolCacheControllerRoutes');
export const SymbolControllerOptionsResource = Symbol('SymbolControllerOptionsResource');
export const recordResourceNameToRoutePath: Record<keyof IControllerRecord, IRecordResourceNameToRoutePathItem> = {} as any;

export function getCacheControllerRoutes(app: VonaApplication): Record<string, ContextRoute[]> {
  if (!app.meta[SymbolCacheControllerRoutes]) app.meta[SymbolCacheControllerRoutes] = {};
  return app.meta[SymbolCacheControllerRoutes];
}
