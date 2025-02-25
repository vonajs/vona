import path from 'node:path';
import { pathToHref } from '../utils/util.ts';

export function useApp() {
  return globalThis.__app__;
}

export async function closeApp() {
  if (globalThis.__app__) {
    await globalThis.__app__.meta.close();
    delete globalThis.__app__;
  }
}

export async function createTestApp(projectPath: string) {
  const testFile = path.join(projectPath, '.vona/test.ts');
  const testInstance = await import(pathToHref(testFile));
  await testInstance.getApp();
}
