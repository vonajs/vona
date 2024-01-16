import { parseModuleName as _parseModuleName, ParseModuleNameLevelInit } from '@cabloy/module-info';

export const ParseModuleNameLevel = ParseModuleNameLevelInit + 5;

export function parseModuleName() {
  return _parseModuleName(ParseModuleNameLevel);
}
