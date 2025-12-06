import type { ICliBuildCustomOptions } from '@cabloy/cli';
import { copySqlite3NativeBinding } from 'vona';

export async function afterBuild(options: ICliBuildCustomOptions) {
  const { projectPath, outDir } = options;
  await copySqlite3NativeBinding(projectPath, outDir);
}
