import type { VonaBinConfigOptions } from './types.ts';
import { createRequire } from 'node:module';
import path from 'node:path';
import fse from 'fs-extra';
import { copyTemplateIfNeed, pathToHref } from '../../utils.ts';

const __ImportOpenapi = '@asteasolutions/zod-to-openapi';

export async function generateOpenapi(configOptions: VonaBinConfigOptions) {
  await __generateOpenapiIndex(configOptions);
}

function __generateOpenapiIndex(configOptions: VonaBinConfigOptions) {
  const pathIndex = parseOpenapiPath(configOptions.appDir);
  const fileSrc = path.join(pathIndex, 'index.mjs');
  const fileSrcBak = path.join(pathIndex, 'index-origin.mjs');
  copyTemplateIfNeed(fileSrc, fileSrcBak);
  const content = fse.readFileSync(fileSrcBak).toString();
  const contentNew = content
    .replace(
      'class Metadata {',
      'export class Metadata {',
    );
  fse.writeFileSync(fileSrc, contentNew);
}

function parseOpenapiPath(appDir: string) {
  const require = createRequire(pathToHref(path.join(appDir, '/')));
  const fileIndex = require.resolve(__ImportOpenapi);
  return path.dirname(fileIndex);
}
