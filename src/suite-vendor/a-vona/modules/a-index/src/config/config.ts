import type { VonaApplication } from 'vona';
import type { MetaOptionsIndexModuleIndexes } from '../types/indexes.js';

export type ConfigModulesIndexes = Record<string, MetaOptionsIndexModuleIndexes>;
export const config = (_app: VonaApplication) => {
  return {
    indexes: {} as ConfigModulesIndexes,
    indexesCheck: true,
  };
};
