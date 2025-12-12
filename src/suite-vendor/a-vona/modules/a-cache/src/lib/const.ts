import type { VonaApplication } from 'vona';

export const SymbolCacheMemories = Symbol('SymbolCacheMemories');

export function clearAllCacheMemories(app: VonaApplication) {
  delete app[SymbolCacheMemories];
}
