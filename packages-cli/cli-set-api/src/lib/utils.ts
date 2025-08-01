import type { VonaConfigMeta, VonaMetaMode } from '@cabloy/module-info';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import fse from 'fs-extra';
import compileTemplate from 'lodash/template.js';

export function getEnvMeta(configMeta: VonaConfigMeta) {
  return { flavor: configMeta.flavor, mode: configMeta.mode, mine: 'mine' };
}

export function getNodeEnv(mode: VonaMetaMode) {
  return mode === 'test' ? 'test' : mode === 'dev' ? 'development' : 'production';
}

export function resolveTemplatePath(file: string) {
  const url = (new URL(path.join('../../templates', file), import.meta.url));
  return fileURLToPath(url);
}

export function generateConfigDefine(env, translates?: string[]) {
  const acc = {};
  for (const key in env) {
    if (!translates || translates.includes(key)) {
      acc[`process.env.${key}`] = JSON.stringify(env[key]);
    } else {
      acc[`process.env.${key}`] = `'process.env.${key}->app.meta.env.${key}'`;
    }
  }
  return acc;
}

export function getAbsolutePathOfModule(id: string, postfix: string = 'index.js') {
  const require = createRequire(import.meta.url);
  let modulePath = require.resolve(id);
  if (postfix) {
    const pos = modulePath.lastIndexOf(postfix);
    if (pos > -1) {
      modulePath = modulePath.substring(0, modulePath.length - postfix.length - 1);
    }
  }
  return modulePath;
}

export function requireModule(id: string) {
  const require = createRequire(import.meta.url);
  return require(id);
}

export async function copyTemplateFile(fileSrc: URL | string, fileDest: string, variables?) {
  if (!variables) {
    await fse.copyFile(fileSrc, fileDest);
    return;
  }
  // src
  const contentSrc = (await fse.readFile(fileSrc, 'utf-8')).toString();
  const template = compileTemplate(contentSrc);
  // dest
  const contentDest = template(variables);
  await fse.writeFile(fileDest, contentDest, 'utf-8');
}

export async function loadJSONFile(fileName: string) {
  const pkgContent = (await fse.readFile(fileName)).toString();
  return JSON.parse(pkgContent);
}

export async function saveJSONFile(fileName: string, json: object) {
  await fse.writeFile(fileName, `${JSON.stringify(json, null, 2)}\n`);
}

export function pathToHref(fileName: string): string {
  return pathToFileURL(fileName).href;
}

export function getOutDir() {
  return process.env.BUILD_OUTDIR || `dist/${process.env.META_FLAVOR}`;
}

export function getOutReleasesDir() {
  return `dist-releases/${process.env.META_FLAVOR}-${process.env.APP_VERSION}`;
}
