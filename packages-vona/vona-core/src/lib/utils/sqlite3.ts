import type { VonaApplication } from '../core/application.ts';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import fse from 'fs-extra';
import { pathToHref } from './util.ts';

export function getSqlite3DatabaseNameDefault(app: VonaApplication) {
  const mode = app.configMeta.mode;
  if (mode !== 'prod') return '';
  const dbPath = path.join(os.homedir(), 'vona', app.name);
  fse.ensureDirSync(dbPath);
  return path.join(dbPath, 'sqlite3.db');
}

export function getSqlite3NativeBinding(_app: VonaApplication, nativeBinding: string | undefined) {
  if (!nativeBinding) return null as unknown as undefined;
  const nativeBindingPath = path.isAbsolute(nativeBinding) ? nativeBinding : path.join(import.meta.dirname, nativeBinding);
  const require = createRequire(import.meta.url);
  const addon = require(nativeBindingPath);
  return addon as any;
}

export async function copySqlite3NativeBinding(projectPath: string, outDir: string) {
  const require = createRequire(pathToHref(path.join(projectPath, '/')));
  const modulePath = require.resolve('better-sqlite3/package.json');
  const fileSrc = path.join(path.dirname(modulePath), 'build/Release/better_sqlite3.node');
  const fileDest = path.join(outDir, 'node/better_sqlite3.node');
  await fse.copy(fileSrc, fileDest);
}
