import fs from 'fs';
import path from 'path';
import StackUtils from 'stack-utils';
import { IModuleInfo } from './interface.js';
export * from './interface.js';

export function lookupPackage(dir) {
  let _dir = dir;
  // eslint-disable-next-line
  while (true) {
    const file = path.join(_dir, 'package.json');
    if (file === '/package.json') return null;
    if (fs.existsSync(file)) return file;
    _dir = path.join(_dir, '../');
  }
}

export function parseInfoFromPackage(dir) {
  const file = lookupPackage(dir);
  if (!file) return null;
  const pkg = require(file);
  return parseInfo(parseName(pkg.name));
}

export const ParseModuleNameLevelInit = 1;
export function parseModuleName(level: number = ParseModuleNameLevelInit): string | undefined {
  const stackUtils = new StackUtils();
  const traces = stackUtils.capture(level);
  const trace = traces[level - 1];
  let fileName = trace.getFileName();
  fileName = fileName.replace(/\\/gi, '/');
  const parts = fileName.split('/');
  for (let i = parts.length - 1; i >= 0; i--) {
    let part = parts[i];
    if (part.indexOf('-') === -1) continue;
    const info = parseInfo(part);
    if (!info) continue;
    return info.relativeName;
  }
  return;
}

const PREFIX_A = '/api/';
const PREFIX_B = 'cabloy-module-api-';
const PREFIX_C = './cabloy-module-api-';
const PREFIX_D = './';

// aa-hello aa/hello
//   first check / then -
export function parseInfo(moduleName, type = 'module'): IModuleInfo | null {
  if (!moduleName) return null;
  if (moduleName.indexOf('://') > -1) return null;
  if (moduleName.charAt(0) === '/') moduleName = moduleName.substr(1);
  let parts = moduleName.split('/').filter(item => item);
  if (parts.length < 2) {
    parts = moduleName.split('-').filter(item => item);
    if (parts.length < 2) return null;
    if (parts.length >= 5) parts = parts.slice(3);
  }
  if (type === 'suite') {
    return {
      pid: parts[0],
      name: parts[1],
      fullName: `cabloy-suite-api-${parts[0]}-${parts[1]}`,
      relativeName: `${parts[0]}-${parts[1]}`,
    };
  }
  return {
    pid: parts[0],
    name: parts[1],
    fullName: `cabloy-module-api-${parts[0]}-${parts[1]}`,
    relativeName: `${parts[0]}-${parts[1]}`,
    url: `${parts[0]}/${parts[1]}`,
    sync: parts[2] === 'sync',
    monkey: parts[2] === 'monkey',
  };
}

// /api/aa/hello/home/index
// cabloy-module-api-aa-hello
// ./aa-hello/
// ./cabloy-module-api-aa-hello/
export function parseName(moduleUrl) {
  if (!moduleUrl) return null;
  if (moduleUrl.indexOf('/api/static/') === 0) {
    moduleUrl = '/api/' + moduleUrl.substring('/api/static/'.length);
  }
  if (moduleUrl.indexOf(PREFIX_A) === 0) {
    const posA = PREFIX_A.length;
    const posB = moduleUrl.indexOf('/', posA) + 1;
    if (posB === -1) return null;
    const posC = moduleUrl.indexOf('/', posB);
    if (posC === -1) return null;
    return moduleUrl.substring(posA, posC);
  } else if (moduleUrl.indexOf(PREFIX_B) === 0) {
    return _parseName(moduleUrl, PREFIX_B);
  } else if (moduleUrl.indexOf(PREFIX_C) === 0) {
    return _parseName(moduleUrl, PREFIX_C);
  } else if (moduleUrl.indexOf(PREFIX_D) === 0) {
    return _parseName(moduleUrl, PREFIX_D);
  }
  return null;
}

function _parseName(moduleUrl, prefix) {
  const posA = prefix.length;
  let posB = moduleUrl.indexOf('/', posA);
  if (posB === -1) posB = moduleUrl.length;
  return moduleUrl.substring(posA, posB);
}
