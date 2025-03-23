import type * as ModuleInfo from '@cabloy/module-info';
import type { IModule } from '@cabloy/module-info';
import type { BinaryToTextEncoding, HashOptions } from 'node:crypto';
import type { TypeMonkeyName, VonaContext } from '../../types/index.ts';
import type { IBeanSceneRecord } from '../decorator/interface/beanOptions.ts';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compose as _compose } from '@cabloy/compose';
import { extend } from '@cabloy/extend';
import { stringToCapitalize, toLowerCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import * as uuid from 'uuid';
import { cast } from '../../types/index.ts';
import { BeanSimple } from '../bean/beanSimple.ts';

export interface IExecuteBeanCallbackParams {
  ctx: VonaContext;
  bean: any;
  context: any;
}
export interface IExecuteBeanCallback {
  (params: IExecuteBeanCallbackParams): Promise<any>;
}

export interface IModuleAssetSceneRecord {
  cli: never;
  static: never;
  templates: never;
}

const SymbolProdRootPath = Symbol('SymbolProdRootPath');

export class AppUtil extends BeanSimple {
  private [SymbolProdRootPath]: string;

  instanceStarted(instanceName: string): boolean {
    return this.app.meta.appReadyInstances && this.app.meta.appReadyInstances[instanceName];
  }

  get protocol() {
    const config = this.app.config;
    return config.server.serve.protocol || this.ctx?.protocol;
  }

  get host() {
    const config = this.app.config;
    return config.server.serve.host || this.ctx?.host;
  }

  getAbsoluteUrl(path?: string) {
    const prefix = this.host ? `${this.protocol}://${this.host}` : '';
    return `${prefix}${path || ''}`;
  }

  getAbsoluteUrlByApiPath(path: string) {
    return this.getAbsoluteUrl(this.combineApiPath(path, '', true, true));
  }

  combineApiPathControllerAndActionRaw(
    moduleName: ModuleInfo.IModuleInfo | string,
    controllerPath: string | undefined,
    actionPath: RegExp | string | undefined,
    simplify?: boolean,
  ): string {
    let apiPath = this.combineApiPathControllerAndAction(moduleName, controllerPath, actionPath, '/_api_', simplify);
    if (typeof apiPath !== 'string') return apiPath;
    if (apiPath.startsWith('/_api_')) {
      apiPath = apiPath.substring('/_api_'.length);
    } else {
      apiPath = `/${apiPath}`;
    }
    return apiPath;
  }

  combineApiPathControllerAndAction(
    moduleName: ModuleInfo.IModuleInfo | string,
    controllerPath: string | undefined,
    actionPath: RegExp | string | undefined,
    prefix?: string | boolean,
    simplify?: boolean,
  ): string {
    if (actionPath === undefined) actionPath = '';
    // routePath
    let routePath: string;
    if (typeof actionPath !== 'string') {
      // regexp
      throw new TypeError('regexp not supported');
    } else if (actionPath.startsWith('/')) {
      // absolute
      routePath = this.combineApiPath(actionPath, moduleName, prefix, simplify);
    } else {
      // relative
      if (!controllerPath) {
        routePath = this.combineApiPath(actionPath, moduleName, prefix, simplify);
      } else {
        routePath = this.combineApiPath(controllerPath, moduleName, prefix, simplify);
        if (actionPath) {
          routePath = `${routePath}/${actionPath}`;
        }
      }
    }
    return routePath;
  }

  combineApiPath(
    path: string | undefined,
    moduleName?: ModuleInfo.IModuleInfo | string,
    prefix?: string | boolean,
    simplify?: boolean,
  ) {
    const globalPrefix = typeof prefix === 'string' ? prefix : prefix === false ? '' : this.app.config.server.globalPrefix;
    simplify = simplify ?? true;
    if (!path) path = '';
    // ignore globalPrefix
    if (path.startsWith('//')) return path.substring(1);
    // ignore module path
    if (path.startsWith('/')) return `${globalPrefix}${path}`;
    // globalPrefix + module path + arg
    const parts = combineResourceName(path, moduleName ?? '', simplify, true);
    return `${globalPrefix}/${parts.join('/')}`;
  }

  combineResourceName(
    resourceName: string | undefined,
    moduleName: ModuleInfo.IModuleInfo | string,
    simplify?: boolean,
    simplifyProviderId?: boolean,
  ): string {
    const parts = combineResourceName(resourceName, moduleName, simplify, simplifyProviderId);
    return toLowerCaseFirstChar(stringToCapitalize(parts));
  }

  combineStaticPath(path: string | undefined, moduleName?: ModuleInfo.IModuleInfo | string) {
    const globalPrefix = '/api/static';
    if (!path) path = '';
    // ignore globalPrefix
    if (path.startsWith('//')) return path.substring(1);
    // ignore module path
    if (path.startsWith('/')) return `${globalPrefix}${path}`;
    // globalPrefix + module path + arg
    if (!moduleName) throw new Error('should specify the moduleName');
    if (typeof moduleName !== 'string') moduleName = moduleName.relativeName;
    const parts = moduleName.split('-');
    // path
    return `${globalPrefix}/${parts[0]}/${parts[1]}/${path}`;
  }

  async getPublicPathPhysical(subdir?: string, ensure?: boolean) {
    const rootPath = this.app.config.server.publicDir;
    // use instance.id, not instanceName
    const dir = path.join(rootPath, cast(this.ctx).instance.id.toString(), subdir || '');
    if (ensure) {
      await fse.ensureDir(dir);
    }
    return dir;
  }

  get prodRootPath(): string {
    if (!this.app.meta.isProd) throw new Error('only invoked in prod');
    if (!this[SymbolProdRootPath]) {
      this[SymbolProdRootPath] = import.meta.dirname;
    }
    return this[SymbolProdRootPath];
  }

  getAssetPathPhysical(
    moduleName: ModuleInfo.IModuleInfo | string,
    scene: keyof IModuleAssetSceneRecord,
    assetPath?: string,
  ) {
    if (typeof moduleName !== 'string') moduleName = moduleName.relativeName;
    if (this.app.meta.isProd) {
      return path.join(this.prodRootPath, 'assets', scene, moduleName, assetPath || '');
    } else {
      const module = this.app.meta.modules[moduleName];
      if (!module) throw new Error('module not found');
      return path.join(module.root, scene, assetPath || '');
    }
  }

  createError(data, returnObject?: boolean) {
    const error = returnObject ? ({} as any) : new Error();
    error.code = data.code !== undefined ? data.code : 500;
    if (data.message && typeof data.message === 'object') {
      error.message = JSON.stringify(data.message, null, 2);
    } else {
      error.message = data.message;
    }
    if (!this.app.meta.isProd) {
      if (data.stack) error.stack = data.stack;
      if (data.name) error.name = data.name;
      if (data.errno) (error as any).errno = data.errno;
      if (data.sqlMessage) (error as any).sqlMessage = data.sqlMessage;
      if (data.sqlState) (error as any).sqlState = data.sqlState;
      if (data.index) (error as any).index = data.index;
      if (data.sql) (error as any).sql = data.sql;
    }
    return error;
  }

  async monkeyModule(
    ebAppMonkey,
    ebModulesMonkey,
    monkeyName: TypeMonkeyName,
    moduleTarget?: IModule,
    ...monkeyData: any[]
  ) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      await moduleTarget.mainInstance[monkeyName](...monkeyData);
    }
    // module monkey
    for (const key in ebModulesMonkey) {
      const moduleMonkey: IModule = ebModulesMonkey[key];
      if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
        if (moduleTarget === undefined) {
          // @ts-ignore ignore
          await moduleMonkey.monkeyInstance[monkeyName](...monkeyData);
        } else {
          // @ts-ignore ignore
          await moduleMonkey.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
        }
      }
    }
    // app monkey
    if (ebAppMonkey && ebAppMonkey[monkeyName]) {
      if (moduleTarget === undefined) {
        await ebAppMonkey[monkeyName](...monkeyData);
      } else {
        await ebAppMonkey[monkeyName](moduleTarget, ...monkeyData);
      }
    }
  }

  monkeyModuleSync(
    ebAppMonkey,
    ebModulesMonkey,
    monkeyName: TypeMonkeyName,
    moduleTarget?: IModule,
    ...monkeyData: any[]
  ) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      moduleTarget.mainInstance[monkeyName](...monkeyData);
    }
    // module monkey
    for (const key in ebModulesMonkey) {
      const moduleMonkey: IModule = ebModulesMonkey[key];
      if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
        if (moduleTarget === undefined) {
          // @ts-ignore ignore
          moduleMonkey.monkeyInstance[monkeyName](...monkeyData);
        } else {
          // @ts-ignore ignore
          moduleMonkey.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
        }
      }
    }
    // app monkey
    if (ebAppMonkey && ebAppMonkey[monkeyName]) {
      if (moduleTarget === undefined) {
        ebAppMonkey[monkeyName](...monkeyData);
      } else {
        ebAppMonkey[monkeyName](moduleTarget, ...monkeyData);
      }
    }
  }

  detectErrorMessage(err: Error) {
    // detect json parse error
    if (
      err.status === 400 &&
      err.name === 'SyntaxError' &&
      this.ctx.request.is('application/json', 'application/vnd.api+json', 'application/csp-report')
    ) {
      return 'Problems parsing JSON';
    }
    return err.message;
  }

  detectStatus(err: Error) {
    // detect status
    let status = err.status || 500;
    if (typeof status !== 'number') status = Number(status);
    if (status < 200) {
      // invalid status consider as 500, like urllib will return -1 status
      status = 500;
    }
    return status;
  }

  accepts() {
    if (this.ctx.acceptJSON) return 'json';
    return 'html';
  }
}

export function combineResourceName(
  resourceName: string | undefined,
  moduleName: ModuleInfo.IModuleInfo | string,
  simplify?: boolean,
  simplifyProviderId?: boolean,
): string[] {
  simplify = simplify ?? true;
  simplifyProviderId = simplifyProviderId ?? true;
  if (!resourceName) resourceName = '';
  // module path + arg
  if (typeof moduleName !== 'string') moduleName = moduleName.relativeName;
  const parts = moduleName.split('-');
  // path
  const res: string[] = [];
  if (!simplifyProviderId || parts[0] !== 'a') res.push(parts[0]);
  if (!simplify || !resourceName.startsWith(parts[1])) res.push(parts[1]);
  if (resourceName) res.push(resourceName);
  return res;
}

export function combineQueries(url: string, queries: object): string {
  //
  if (!queries) return url;
  //
  let str = '';
  for (const key of Object.keys(queries)) {
    str += `${key}=${encodeURIComponent(queries[key])}&`;
  }
  if (str) {
    str = str.substr(0, str.length - 1);
  }
  if (!str) return url;
  //
  if (!url) return `?${str}`;
  //
  const pos = url.indexOf('?');
  if (pos === -1) return `${url}?${str}`;
  if (pos === url.length - 1) return `${url}${str}`;
  return `${url}&${str}`;
}

export function compose(chains, adapter?) {
  return _compose(chains, adapter);
}

export function instanceDesp(instanceName: string | null | undefined): string {
  if (instanceName === undefined || instanceName === null) return '~';
  return instanceName || '-';
}

export function requireDynamic(file: string) {
  if (!file) throw new Error('file should not empty');
  const require = createRequire(import.meta.url);
  let instance = require(file);
  const mtime = _requireDynamic_getFileTime(file);
  if (instance.__requireDynamic_mtime === undefined) {
    instance.__requireDynamic_mtime = mtime;
  } else if (instance.__requireDynamic_mtime !== mtime) {
    delete require.cache[require.resolve(file)];
    instance = require(file);
    instance.__requireDynamic_mtime = mtime;
  }
  return instance;
}

function _requireDynamic_getFileTime(file) {
  if (!path.isAbsolute(file)) return null;
  const exists = fse.pathExistsSync(file);
  if (!exists) return null;
  // stat
  const stat = fse.statSync(file);
  return stat.mtime.valueOf();
}

export function deepExtend<T extends []>(target: T, ...args): [];
export function deepExtend<T = any>(target: {}, ...args): T;
export function deepExtend(target: any, ...args): any {
  return extend(true, target, ...args);
}

export function uuidv4() {
  return uuid.v4();
}

export function createHash(str: string, encoding?: BinaryToTextEncoding, algorithm?: string, options?: HashOptions) {
  const hash = crypto.createHash(algorithm ?? 'sha256', options);
  hash.update(str);
  return hash.digest(encoding ?? 'hex');
}

export async function disposeInstance(instance: any) {
  await instance?.__dispose__?.();
}

export function polyfillDispose(instance: any) {
  if (!instance || instance.__dispose__) return;
  Object.getPrototypeOf(instance).__dispose__ = () => {};
}

export function pathToHref(fileName: string): string {
  return pathToFileURL(fileName).href;
  // return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
}

export function prepareEnv(env: Partial<NodeJS.ProcessEnv>) {
  for (const key of Object.keys(env)) {
    if (process.env[key] === undefined && cast(env[key]) !== false) {
      process.env[key] = env[key]?.toString();
    }
  }
}

export function beanFullNameFromOnionName(onionName: string, sceneName: keyof IBeanSceneRecord): string {
  return onionName.replace(':', `.${sceneName}.`);
}

export function onionNameFromBeanFullName(beanFullName: string, sceneName: keyof IBeanSceneRecord): string {
  return beanFullName.replace(`.${sceneName}.`, ':');
}
