import { MetaOptionsIndexModuleIndexes, VonaApplication } from 'vona';

export type ConfigModulesIndexes = Record<string, MetaOptionsIndexModuleIndexes>;
export const config = (_app: VonaApplication) => {
  return {
    indexes: {} as ConfigModulesIndexes,
    indexesCheck: true,
  };
};
