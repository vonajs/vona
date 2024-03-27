import StackUtils from 'stack-utils';
import { IModuleInfo, TypeProjectEntityType, TypeProjectMode } from './interface.js';
export * from './interface.js';

export const ParseModuleNameLevelInit = 1;
export function parseModuleName(level: number = ParseModuleNameLevelInit): string | undefined {
  const info = parseModuleInfo(level + 1);
  if (!info) return;
  return info.relativeName;
}

export function parseModuleInfo(level: number = ParseModuleNameLevelInit): IModuleInfo | undefined {
  const stackUtils = new StackUtils();
  const traces = stackUtils.capture(level);
  const trace = traces[level - 1];
  const fileName = trace.getFileName();
  return parseInfoFromPath(fileName);
}

export function parseInfoFromPath(pathName?: string | null): IModuleInfo | undefined {
  if (!pathName) return;
  pathName = pathName.replace(/\\/gi, '/');
  const parts = pathName.split('/');
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part.indexOf('-') === -1) continue;
    const info = parseInfo(part);
    if (!info) continue;
    return info;
  }
}

const PREFIX_A = '/api/';
const PREFIX_B = 'cabloy-module-api-';
const PREFIX_C = './cabloy-module-api-';
const PREFIX_D = './';

// aa-hello aa/hello
//   first check / then -
export function parseInfo(moduleName: string | undefined): IModuleInfo | undefined {
  if (!moduleName) return;
  if (moduleName.indexOf('://') > -1) return;
  if (moduleName.charAt(0) === '/') moduleName = moduleName.substring(1);
  let parts = moduleName.split('/').filter(item => item);
  if (parts.length < 2) {
    parts = moduleName.split('-').filter(item => item);
    if (parts.length < 2) return;
    if (parts.length >= 5) parts = parts.slice(3);
  }
  const info = {
    pid: parts[0],
    name: parts[1],
    relativeName: `${parts[0]}-${parts[1]}`,
    url: `${parts[0]}/${parts[1]}`,
    originalName: parts.join('-'),
  } as IModuleInfo;
  if (parts[2] === 'sync') info.sync = true;
  if (parts[2] === 'monkey') info.monkey = true;
  return info;
}

export function parseInfoPro(
  moduleName: string | undefined,
  projectMode: TypeProjectMode,
  projectEntityType: TypeProjectEntityType,
): IModuleInfo | undefined {
  const info = parseInfo(moduleName);
  if (!info) return info;
  let fullName = `cabloy-${projectEntityType}-${projectMode}-${info.relativeName}`;
  if (info.sync) fullName = `${fullName}-sync`;
  if (info.monkey) fullName = `${fullName}-monkey`;
  info.fullName = fullName;
  return info;
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
