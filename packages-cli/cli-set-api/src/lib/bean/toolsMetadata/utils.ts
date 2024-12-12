import { stringToCapitalize } from '@cabloy/word-utils';

export function checkIgnoreOfParts(parts: string[]) {
  const indexLast = parts.length - 1;
  if (parts[indexLast].endsWith('_')) {
    parts[indexLast] = parts[indexLast].substring(0, parts[indexLast].length - 1);
    return true;
  }
  return false;
}

export function getScopeModuleName(moduleName: string) {
  return `ScopeModule${stringToCapitalize(moduleName, '-')}`;
}
