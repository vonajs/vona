import { VonaApplication } from 'vona';
import { MetaOptionsIndexModuleIndexes } from 'vona-module-a-meta';

export type ConfigModulesIndexes = Record<string, MetaOptionsIndexModuleIndexes>;
export const config = (_app: VonaApplication) => {
  return {
    indexes: {} as ConfigModulesIndexes,
    indexesCheck: true,
  };
};
