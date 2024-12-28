import { compose as _compose } from '@cabloy/compose';
import { extend } from '@cabloy/extend';
import * as ModuleInfo from '@cabloy/module-info';
import * as security from 'egg-security';
import fse from 'fs-extra';
import path from 'node:path';
import os from 'node:os';
import { URL } from 'url';
import * as uuid from 'uuid';
import { IModule, TypeMonkeyName, VonaContext } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { stringToCapitalize, toLowerCaseFirstChar } from '@cabloy/word-utils';

export interface IExecuteBeanCallbackParams {
  ctx: VonaContext;
  bean: any;
  context: any;
}
export interface IExecuteBeanCallback {
  (params: IExecuteBeanCallbackParams): Promise<any>;
}

export class AppUtil extends BeanSimple {
  instanceStarted(subdomain: string): boolean {
    return this.app.meta.appReadyInstances && this.app.meta.appReadyInstances[subdomain];
  }

  combineApiPathControllerAndActionRaw(
    moduleName: ModuleInfo.IModuleInfo | string,
    controllerPath: string | undefined,
    actionPath: RegExp | string | undefined,
    simplify?: boolean,
  ): RegExp | string {
    let apiPath = this.combineApiPathControllerAndAction(moduleName, controllerPath, actionPath, '/_api_', simplify);
    if (typeof apiPath !== 'string') return apiPath;
    if (apiPath.startsWith('/_api_')) {
      apiPath = apiPath.substring('/_api_'.length);
    } else {
      apiPath = '/' + apiPath;
    }
    return apiPath;
  }

  combineApiPathControllerAndAction(
    moduleName: ModuleInfo.IModuleInfo | string,
    controllerPath: string | undefined,
    actionPath: RegExp | string | undefined,
    prefix?: string | boolean,
    simplify?: boolean,
  ): RegExp | string {
    if (actionPath === undefined) actionPath = '';
    // routePath
    let routePath: RegExp | string;
    if (typeof actionPath !== 'string') {
      // regexp
      routePath = actionPath;
    } else if (actionPath.startsWith('/')) {
      // absolute
      routePath = this.combineApiPath(moduleName, actionPath, prefix, simplify);
    } else {
      // relative
      if (!controllerPath) {
        routePath = this.combineApiPath(moduleName, actionPath, prefix, simplify);
      } else {
        routePath = this.combineApiPath(moduleName, controllerPath, prefix, simplify);
        if (actionPath) {
          routePath = `${routePath}/${actionPath}`;
        }
      }
    }
    return routePath;
  }

  combineApiPath(
    moduleName: ModuleInfo.IModuleInfo | string,
    path: string | undefined,
    prefix?: string | boolean,
    simplify?: boolean,
  ) {
    const globalPrefix = typeof prefix === 'string' ? prefix : prefix === false ? '' : this.app.config.globalPrefix;
    simplify = simplify ?? true;
    if (!path) path = '';
    // ignore globalPrefix
    if (path.startsWith('//')) return path.substring(1);
    // ignore module path
    if (path.startsWith('/')) return `${globalPrefix}${path}`;
    // globalPrefix + module path + arg
    const parts = combineResourceName(moduleName, path, simplify, true);
    return `${globalPrefix}/${parts.join('/')}`;
  }

  combineResourceName(
    moduleName: ModuleInfo.IModuleInfo | string,
    resourceName: string | undefined,
    simplify?: boolean,
    simplifyProviderId?: boolean,
  ): string {
    const parts = combineResourceName(moduleName, resourceName, simplify, simplifyProviderId);
    return toLowerCaseFirstChar(stringToCapitalize(parts));
  }

  combineStaticPath(moduleName: ModuleInfo.IModuleInfo | string, path: string | undefined) {
    const globalPrefix = '/api/static';
    if (!path) path = '';
    // ignore globalPrefix
    if (path.startsWith('//')) return path.substring(1);
    // ignore module path
    if (path.startsWith('/')) return `${globalPrefix}${path}`;
    // globalPrefix + module path + arg
    if (typeof moduleName !== 'string') moduleName = moduleName.relativeName;
    const parts = moduleName.split('-');
    // path
    return `${globalPrefix}/${parts[0]}/${parts[1]}/${path}`;
  }

  async getPublicPathPhysicalRoot() {
    if (this.app.meta.isTest || this.app.meta.isLocal) {
      return this.app.config.static.dir;
    }
    const dir = this.app.config.publicDir || path.join(os.homedir(), 'vona', this.app.name, 'public');
    await fse.ensureDir(dir);
    return dir;
  }

  async getPublicPathPhysical(subdir?: string, ensure?: boolean) {
    const rootPath = await this.getPublicPathPhysicalRoot();
    // use instance.id, not subdomain
    const dir = path.join(rootPath, this.ctx.instance.id.toString(), subdir || '');
    if (ensure) {
      await fse.ensureDir(dir);
    }
    return dir;
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
      if (data.errno) (<any>error).errno = data.errno;
      if (data.sqlMessage) (<any>error).sqlMessage = data.sqlMessage;
      if (data.sqlState) (<any>error).sqlState = data.sqlState;
      if (data.index) (<any>error).index = data.index;
      if (data.sql) (<any>error).sql = data.sql;
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

  // getWhiteListCors(ctx) {
  //   let whiteListCors;
  //   const _config = ctx.app.bean._getScope('a-base').config;
  //   const _whiteList = (_config && _config.cors && _config.cors.whiteList) || [];
  //   if (!Array.isArray(_whiteList)) {
  //     whiteListCors = _whiteList.split(',');
  //   } else {
  //     whiteListCors = _whiteList.concat();
  //   }
  //   // inherits from jsonp
  //   let _whiteListJsonp = _config && _config.jsonp && _config.jsonp.whiteList;
  //   if (_whiteListJsonp) {
  //     if (!Array.isArray(_whiteListJsonp)) {
  //       _whiteListJsonp = _whiteListJsonp.split(',');
  //     }
  //     whiteListCors = whiteListCors.concat(_whiteListJsonp);
  //   }
  //   // hostSelf
  //   const hostSelf = ctx.app.bean.base.getAbsoluteUrl();
  //   if (hostSelf) {
  //     whiteListCors.push(hostSelf);
  //   }
  //   // ok
  //   return whiteListCors;
  // }

  isSafeDomain(ctx: VonaContext, origin) {
    // origin is {protocol}{hostname}{port}...
    if (!origin || origin === 'null' || origin === null) return true;

    // whiteList
    let whiteListCors = ctx.app.config.cors.origin;
    if (whiteListCors === '*') return true;
    if (!whiteListCors) return false;
    if (typeof whiteListCors === 'string') {
      whiteListCors = whiteListCors.split(',');
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(origin);
    } catch (_) {
      return false;
    }

    if (
      security.utils.isSafeDomain(parsedUrl.hostname, whiteListCors) ||
      security.utils.isSafeDomain(origin, whiteListCors)
    ) {
      return true;
    }
    return false;
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
    if (this.ctx.acceptJSONP) return 'js';
    return 'html';
  }
}

export function combineResourceName(
  moduleName: ModuleInfo.IModuleInfo | string,
  resourceName: string | undefined,
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
  if (!url) return '?' + str;
  //
  const pos = url.indexOf('?');
  if (pos === -1) return `${url}?${str}`;
  if (pos === url.length - 1) return `${url}${str}`;
  return `${url}&${str}`;
}

export function isNilOrEmptyString(str?: string | undefined | null): str is null | undefined | '' {
  return str === undefined || str === null || str === '';
}

export function compose(chains, adapter?) {
  return _compose(chains, adapter);
}

export function subdomainDesp(subdomain: string | null | undefined): string {
  if (subdomain === undefined || subdomain === null) return '~';
  return subdomain || '-';
}

export function deprecated(oldUsage, newUsage) {
  const message = '`'
    .concat(oldUsage, '` is deprecated and will be removed in a later version. Use `')
    .concat(newUsage, '` instead');
  return console.warn(message);
}

export function requireDynamic(file: string) {
  if (!file) throw new Error('file should not empty');
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

export function deepExtend<T = any>(...args): T {
  return extend(true, ...args);
}

export async function catchError<T>(
  fnMethod: (...args: any[]) => Promise<T>,
): Promise<[T, undefined] | [undefined, Error]> {
  let error: Error | undefined;
  let data: T | undefined;
  try {
    data = await fnMethod();
  } catch (err) {
    error = err as Error;
  }
  return error ? [undefined, error!] : [data!, undefined];
}

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function uuidv4() {
  return uuid.v4();
}
