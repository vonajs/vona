import type { VonaConfigMeta, VonaMetaMode } from '@cabloy/module-info';
import { createRequire } from 'node:module';
import path from 'node:path';
import fse from 'fs-extra';
import compileTemplate from 'lodash/template.js';

export function getEnvMeta(configMeta: VonaConfigMeta) {
  return { flavor: configMeta.flavor, mode: configMeta.mode, mine: 'mine' };
}

export function getNodeEnv(mode: VonaMetaMode) {
  return mode === 'test' ? 'test' : mode === 'local' ? 'development' : 'production';
}

export function resolveTemplatePath(file: string) {
  return new URL(path.join('../../templates', file), import.meta.url);
}

export function generateConfigDefine(env) {
  const acc = {};
  for (const key in env) {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  return acc;
}

export function getAbsolutePathOfModule(id: string, postfix: string = 'index.js') {
  const require = createRequire(import.meta.url);
  let modulePath = require.resolve(id);
  const pos = modulePath.lastIndexOf(postfix);
  if (pos > -1) {
    modulePath = modulePath.substring(0, modulePath.length - postfix.length - 1);
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
