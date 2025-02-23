import type { IModuleInfo } from '@cabloy/module-info';
import type { VonaApplication } from 'vona-core';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

export const app: VonaApplication = globalThis.__app__;

export function mockPath(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app: VonaApplication = globalThis.__app__;
  return app.util.combineApiPath(moduleInfo.relativeName, path, false, true);
}

export function mockUrl(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app: VonaApplication = globalThis.__app__;
  return app.util.combineApiPath(moduleInfo.relativeName, path, true, true);
}

export function mockModuleInfo(): IModuleInfo {
  return parseModuleInfo(ParseModuleNameLevel)!;
}
