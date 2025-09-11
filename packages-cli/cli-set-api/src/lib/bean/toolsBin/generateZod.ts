import { createRequire } from 'node:module';
import path from 'node:path';
import fse from 'fs-extra';
import { copyTemplateIfNeed } from '../../utils.ts';

const __ImportZodCore = 'zod/v4/core';

export async function generateZod() {
  await __generateZodCoreUtil();
}

async function __generateZodCoreUtil() {
  const pathZodCore = parseZodCorePath();
  const fileSrc = path.join(pathZodCore, 'util.js');
  const fileSrcBak = path.join(pathZodCore, 'util-origin.js');
  copyTemplateIfNeed(fileSrc, fileSrcBak);
  const content = fse.readFileSync(fileSrcBak).toString();
  const contentNew = content
    .replace(
      'export function finalizeIssue',
      `let __localeAdapterFn;
export function setLocaleAdapter(localeAdapterFn) {
  __localeAdapterFn=localeAdapterFn;
}
export function finalizeIssue`,
    )
    .replace(
      'const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??',
      `const msg = unwrapMessage(iss.inst?._zod.def?.error?.(iss));
        const message = (__localeAdapterFn?__localeAdapterFn(msg):msg) ??`,
    );
  fse.writeFileSync(fileSrc, contentNew);
}

function parseZodCorePath() {
  const require = createRequire(import.meta.url);
  const fileCoreIndex = require.resolve(__ImportZodCore);
  return path.dirname(fileCoreIndex);
}
