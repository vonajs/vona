import type { IModuleInfo } from '@cabloy/module-info';
import type { VonaApplication } from 'vona-core';
import path from 'node:path';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

export async function createApp(projectPath: string) {
  if (!globalThis.__app__) {
    const testFile = path.join(projectPath, '.vona/test.ts');
    const testInstance = await import(testFile);
    globalThis.__app__ = await testInstance.getApp();
  }
  return globalThis.__app__;
}

export async function closeApp() {
  if (globalThis.__app__) {
    await globalThis.__app__.meta.close();
  }
}

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
