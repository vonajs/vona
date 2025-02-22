import { parseModuleName as _parseModuleName, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';

export const ParseModuleNameLevel = ParseModuleNameLevelInit + 5;

export function parseModuleName() {
  if (process.env.META_MODE === 'prod') return undefined;
  return _parseModuleName(ParseModuleNameLevel);
}
