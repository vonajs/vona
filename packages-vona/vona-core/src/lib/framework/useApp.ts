import path from 'node:path';
import { pathToHref } from '../utils/util.ts';
import { createApp } from './createApp.ts';

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
  return await testInstance.getApp();
}

export async function reloadApp() {
  await closeApp();
  await createApp(globalThis.__bootstrapOptions__);
}
