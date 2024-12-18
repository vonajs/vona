import fse from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import * as security from 'egg-security';
import * as uuid from 'uuid';
import { VonaContext, IModule, TypeMonkeyName, IModuleInfo, parseInfo } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { compose as _compose } from '@cabloy/compose';
import { extend } from '@cabloy/extend';

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

  combineApiPathControllerAndAction(
    moduleName: IModuleInfo | string,
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
    moduleName: IModuleInfo | string,
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
    const moduleInfo = typeof moduleName === 'string' ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error('invalid url');
    const parts = moduleInfo.relativeName.split('-');
    // path
    let res = globalPrefix;
    if (!simplify || parts[0] !== 'a') res = `${res}/${parts[0]}`;
    if (!simplify || !path.startsWith(parts[1])) res = `${res}/${parts[1]}`;
    if (path) res = `${res}/${path}`;
    return res;
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
