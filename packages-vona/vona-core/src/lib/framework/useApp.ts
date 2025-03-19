import type { VonaApplication } from '../core/application.ts';
import path from 'node:path';
import { sleep } from '@cabloy/utils';
import { pathToHref } from '../utils/util.ts';

export function useApp(): VonaApplication {
  return globalThis.__app__;
}

export async function closeApp(terminate?: boolean) {
  while (globalThis.__closing__) {
    await sleep(50);
  }
  try {
    globalThis.__closing__ = true;
    if (globalThis.__app__) {
      await globalThis.__app__.meta.close();
      delete globalThis.__app__;
    }
  } finally {
    globalThis.__closing__ = false;
  }
  if (terminate) {
    process.kill(process.pid, 'SIGTERM');
  }
}

export async function createTestApp(projectPath: string, envRuntime?: NodeJS.ProcessEnv) {
  const testFile = path.join(projectPath, '.vona/app.ts');
  const testInstance = await import(pathToHref(testFile));
  return await testInstance.createSingleApp(envRuntime);
}

// export async function reloadApp() {
//   while (globalThis.__reloading__) {
//     await sleep(100);
//   }
//   try {
//     globalThis.__reloading__ = true;
//     await closeApp();
//     await createApp(globalThis.__bootstrapOptions__);
//   } finally {
//     globalThis.__reloading__ = false;
//   }
// }
