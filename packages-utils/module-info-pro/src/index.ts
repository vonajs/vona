import type { IModuleInfo } from '@cabloy/module-info';
import { parseInfoFromPath } from '@cabloy/module-info';
import StackUtils from 'stack-utils';

export const ParseModuleNameLevelInit = 1;
export function parseModuleName(level: number = ParseModuleNameLevelInit): string | undefined {
  const info = parseModuleInfo(level + 1);
  if (!info) return;
  return info.relativeName;
}

export function parseModuleInfo(level: number = ParseModuleNameLevelInit): IModuleInfo | undefined {
  const stackUtils = new StackUtils();
  const traces = stackUtils.capture(level);
  const trace = traces[level - 1];
  const fileName = trace.getFileName();
  return parseInfoFromPath(fileName);
}
