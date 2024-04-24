import eggBornUtils from 'egg-born-utils';
import { cascadeExtendKeys } from 'cascade-extend';

export function loadEnvs(_meta: object, _dir: string, _prefix: string = '.env', _postfix?: string) {}

export function metaToScope(meta: object) {
  const scope = {};
  for (const key in meta) {
    scope[meta[key]] = true;
  }
  return scope;
}

export function getEnvFiles(meta: object, dir: string, prefix: string, postfix?: string) {
  // files
  const pattern = [`${dir}/${prefix}*`];
  let files: string[] = eggBornUtils.tools.globbySync(pattern);
  const fileNames = files.map(item => {
    item = item.substring(dir.length + 1);
    if (postfix) {
      item = item.substring(0, item.length - postfix.length);
    }
    return item;
  });
  // source
  const source = {};
  for (const fileName of fileNames) {
    source[fileName] = true;
  }
  // scope
  const scope = metaToScope(meta);
  // extend
  const keys = cascadeExtendKeys(scope, source, prefix, '.');
  if (!keys) return undefined;
  // files
  files = keys.map(key => {
    let file = `${dir}/${key}`;
    if (postfix) {
      file = `${file}${postfix}`;
    }
    return file;
  });
  return files;
}
