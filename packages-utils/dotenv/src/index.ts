import type { DotenvParseOutput } from 'dotenv';
import path from 'node:path';
import { cascadeExtendKeys } from 'cascade-extend';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { globbySync } from 'globby';

export function loadEnvs(
  meta: object,
  dir: string,
  prefix: string = '.env',
  postfixes?: string | string[],
): DotenvParseOutput | undefined {
  // envfiles
  const envFiles = getEnvFiles(meta, dir, prefix, postfixes);
  if (!envFiles) return undefined;
  // dotenv
  const result = dotenv.config({ path: envFiles.reverse() });
  if (result.error) {
    throw result.error;
  }
  // expand
  dotenvExpand.expand(result);
  // ok
  return result.parsed;
}

export function metaToScope(meta: object) {
  const scope = {};
  for (const key in meta) {
    scope[meta[key]] = true;
  }
  return scope;
}

export function getEnvFiles(meta: object, dir: string, prefix: string, postfixes?: string | string[]): string[] | undefined {
  if (typeof postfixes === 'string') postfixes = [postfixes];
  // files
  let files: string[] = globbySync(`${prefix}*`, { cwd: dir });
  // source
  const source = {};
  for (const file of files) {
    if (!postfixes) {
      source[file] = undefined;
    } else {
      const postfix = postfixes.find(postfix => file.endsWith(postfix));
      if (postfix) {
        source[file] = postfix;
      }
    }
  }
  // scope
  const scope = metaToScope(meta);
  // extend
  let keys = cascadeExtendKeys(scope, source, prefix, '.');
  if (!keys) return undefined;
  // mine
  keys = keys.filter(item => !item.includes('.mine')).concat(keys.filter(item => item.includes('.mine')));
  // files
  files = keys.map(key => {
    let file = path.join(dir, key);
    if (source[file]) {
      file = `${file}${source[file]}`;
    }
    return file;
  });
  return files;
}
