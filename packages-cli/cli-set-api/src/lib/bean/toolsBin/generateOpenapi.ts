import type { VonaBinConfigOptions } from './types.ts';
import { createRequire } from 'node:module';
import path from 'node:path';
import fse from 'fs-extra';
import { copyTemplateIfNeed, pathToHref } from '../../utils.ts';

const __ImportOpenapi = '@asteasolutions/zod-to-openapi';

export async function generateOpenapi(configOptions: VonaBinConfigOptions) {
  await __generateOpenapiIndex(configOptions);
  await __generateOpenapiIndexDts(configOptions);
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
    )
    .replace(
      'function isZodType(',
      'export function isZodType(',
    );
  fse.writeFileSync(fileSrc, contentNew);
}

function __generateOpenapiIndexDts(configOptions: VonaBinConfigOptions) {
  const pathIndex = parseOpenapiPath(configOptions.appDir);
  const fileSrc = path.join(pathIndex, 'index.d.ts');
  const fileSrcBak = path.join(pathIndex, 'index-origin.d.ts');
  copyTemplateIfNeed(fileSrc, fileSrcBak);
  const content = fse.readFileSync(fileSrcBak).toString();
  let contentNew = content
    .replace(
      'export { zodToOpenAPIRegistry } from \'./metadata\';',
      'export { Metadata, zodToOpenAPIRegistry } from \'./metadata\';',
    );
  contentNew += '\nexport function isZodType<T>(schema: z.ZodType<T>, typeNames: string | string[]): boolean;\n';
  fse.writeFileSync(fileSrc, contentNew);
}

function parseOpenapiPath(appDir: string) {
  const require = createRequire(pathToHref(path.join(appDir, '/')));
  const fileIndex = require.resolve(__ImportOpenapi);
  return path.dirname(fileIndex);
}
