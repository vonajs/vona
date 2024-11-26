import fse from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import is from 'is-type-of';
import * as security from 'egg-security';
import Redlock from 'redlock';
import { Request } from 'egg';
import { VonaContext, Cast, IModule, PowerPartial, TypeMonkeyName, IModuleInfo, parseInfo } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { ILocalInfos, IModuleMiddlewareGate } from '../bean/index.js';
import { appResource } from '../core/resource.js';
import { compose as _compose, composeAsync as _composeAsync } from '@cabloy/compose';
import { extend } from '@cabloy/extend';

const __EnvTests = ['unittest', 'test'];

export interface IExecuteBeanCallbackParams {
  ctx: VonaContext;
  bean: any;
  context: any;
}
export interface IExecuteBeanCallback {
  (params: IExecuteBeanCallbackParams): Promise<any>;
}

export class AppUtil extends BeanSimple {
  instanceStarted(subdomain) {
    return this.app.meta.appReadyInstances && this.app.meta.appReadyInstances[subdomain];
  }

  combineFetchPath(
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

  combineApiPath(moduleName, arg) {
    if (arg.charAt(0) === '/') return arg;
    const moduleInfo = typeof moduleName === 'string' ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error('invalid url');
    return `/${moduleInfo.url}/${arg}`;
  }

  combineQueries(url, queries) {
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

  async runInAnonymousContextScope<T>(
    scope: (ctx: VonaContext) => Promise<T>,
    {
      locale,
      subdomain,
      module,
      instance,
    }: { locale?: keyof ILocalInfos; subdomain?: string | null | undefined; module?: string; instance?: boolean },
  ): Promise<T> {
    // url
    // todo: remove /api/a/base, need not set url
    const url = module ? this.combineFetchPath(module, '', true, false) : '/api/a/base/';
    const req = {
      method: 'post',
      url,
    };
    return await this.app.runInAnonymousContextScope(async ctx => {
      (<any>ctx.req).ctx = ctx;
      // locale
      Object.defineProperty(ctx, 'locale', {
        get() {
          return locale || this.app.config.i18n.defaultLocale;
        },
      });
      // subdomain
      Object.defineProperty(ctx, 'subdomain', {
        get() {
          return subdomain;
        },
      });
      // instance
      if (subdomain !== undefined && subdomain !== null) {
        ctx.instance = await Cast(this.app.bean).instance.get(subdomain);
        // start instance
        if (instance) {
          await Cast(this.app.bean).instance.checkAppReadyInstance(true);
        }
      }
      // scope
      const res = await scope(ctx as unknown as VonaContext);
      // tail done
      await ctx.tailDone();
      // ok
      return res;
    }, req as Request);
  }

  async executeBean({
    locale,
    subdomain,
    beanModule,
    beanFullName,
    context,
    args,
    fn,
    transaction,
    ctxCaller,
    ctxParent,
    instance,
  }: {
    locale?: keyof ILocalInfos;
    subdomain?: string | null | undefined;
    beanModule?: string;
    beanFullName?: string;
    context?: any;
    args?: any[] | any;
    fn?: any;
    transaction?: boolean;
    ctxCaller?: VonaContext;
    ctxParent?: PowerPartial<VonaContext>;
    instance?: boolean;
  }) {
    // ctxModule
    let ctxModule = beanModule;
    if (!ctxModule && beanFullName) {
      const beanOptions = appResource.getBean(beanFullName as any);
      ctxModule = beanOptions?.module;
    }
    if (!ctxModule) {
      ctxModule = ctxCaller?.module?.info?.relativeName || ctxParent?.module?.info?.relativeName;
    }
    // run
    return await this.runInAnonymousContextScope(
      async ctx => {
        // innerAccess
        ctx.innerAccess = true;
        // ctxCaller
        if (ctxCaller) {
          // multipart
          ctx.multipart = function (options) {
            return ctxCaller.multipart(options);
          };
          // delegateProperties
          delegateProperties(ctx, ctxCaller);
          // ctxCaller
          ctx.ctxCaller = ctxCaller;
        }
        // ctxParent
        if (ctxParent) {
          // delegateProperties
          delegateProperties(ctx, ctxParent);
          // dbLevel
          ctx.dbLevel = (ctxParent.dbLevel || 0) + 1;
        }
        // dbLevel
        if (!ctxCaller && !ctxParent) {
          ctx.dbLevel = 1;
        }
        // bean
        const bean = beanFullName ? this.app.bean._getBean(beanFullName as any) : null;
        if (!bean && beanFullName && !is.function(fn)) {
          throw new Error(`bean not found: ${beanFullName}`);
        }
        // execute
        let res;
        if (transaction) {
          res = await Cast(ctx).transaction.begin(async () => {
            return await this._executeBeanFn({ fn, ctx, bean, context, args });
          });
        } else {
          res = await this._executeBeanFn({ fn, ctx, bean, context, args });
        }
        // ok
        return res;
      },
      { locale, subdomain, module: ctxModule, instance },
    );
  }

  async _executeBeanFn({ fn, ctx, bean, context, args }) {
    let res;
    if (is.function(fn)) {
      res = await fn({ ctx, bean, context, args });
    } else {
      fn = fn || 'execute';
      if (!bean[fn]) {
        throw new Error(`bean method not found: ${bean.__beanFullName__}:${fn}`);
      }
      if (context != undefined) {
        res = await bean[fn](context);
      } else {
        if (Array.isArray(args)) {
          res = await bean[fn](...args);
        } else {
          res = await bean[fn](args);
        }
      }
    }
    return res;
  }

  async lock({
    subdomain,
    resource,
    fn,
    options,
    redlock,
  }: {
    subdomain?: string;
    resource: string;
    fn: () => Promise<any>;
    options;
    redlock?: Redlock;
  }) {
    // resource
    const _lockResource = `redlock_${this.app.name}:${this.subdomainDesp(subdomain)}:${resource}`;
    // options
    const _lockOptions = Object.assign({}, this.app.config.queue.redlock.options, options);
    // redlock
    if (!redlock) {
      redlock = this.app.meta.redlock.create(_lockOptions);
    }
    let _lock = await redlock.lock(_lockResource, _lockOptions.lockTTL);
    // timer
    let _lockTimer = null as any;
    const _lockDone = () => {
      if (_lockTimer) {
        clearInterval(_lockTimer);
        _lockTimer = null;
      }
    };
    _lockTimer = setInterval(() => {
      _lock
        .extend(_lockOptions.lockTTL)
        .then(lock => {
          _lock = lock;
        })
        .catch(err => {
          this.app.logger.error(err);
          _lockDone();
        });
    }, _lockOptions.lockTTL / 2);
    try {
      const res = await fn();
      _lockDone();
      await _lock.unlock();
      return res;
    } catch (err) {
      _lockDone();
      await _lock.unlock();
      throw err;
    }
  }

  checkGate(gate?: IModuleMiddlewareGate) {
    // check none
    if (!gate) return true;
    // check env
    if (!this._checkGateEnv(gate.env)) return false;
    // default
    return true;
  }

  _checkGateEnv(env?: IModuleMiddlewareGate['env']) {
    // check none
    if (!env) return true;
    if (!Array.isArray(env)) env = env.split(',');
    const bingo = env.some(item => {
      if (this.app.config.env === item) return true;
      if (__EnvTests.includes(this.app.config.env) && __EnvTests.includes(item)) return true;
      return false;
    });
    if (!bingo) return false;
    return true;
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

export function isNilOrEmptyString(str?: string | undefined | null): str is null | undefined | '' {
  return str === undefined || str === null || str === '';
}

export function compose(chains, adapter) {
  return _compose(chains, adapter);
}

export function composeAsync(chains, adapter) {
  return _composeAsync(chains, adapter);
}

export function subdomainDesp(subdomain) {
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

function delegateProperties(ctx, ctxCaller) {
  const req = ctx.req;
  for (const property of ['cookies', 'session', 'user', 'state']) {
    delegateProperty(ctx, ctxCaller, property);
  }
  for (const property of ['query', 'params', 'headers', 'body']) {
    delegateProperty(ctx.request, ctxCaller.request, property);
    if (ctx.request[property]) req[property] = ctx.request[property];
  }
  if (ctx.session) req.session = ctx.session;
  // if (ctx.query) req.query = ctx.query;
  // if (ctx.request.body) req.body = ctx.request.body;
}

function delegateProperty(ctx, ctxCaller, property) {
  const keyMock = `__executeBean__mock__${property}__`;
  const keyOriginal = `__executeBean__mock__${property}__original__`;
  if (['cookies', 'session', 'headers'].includes(property)) {
    ctx[keyOriginal] = ctx[property];
  }
  Object.defineProperty(ctx, property, {
    get() {
      const value = ctxCaller && ctxCaller[property];
      if (value) return value;
      //
      if (['user', 'body'].includes(property)) return value;
      //
      if (['cookies', 'session', 'headers'].includes(property)) {
        return ctx[keyOriginal];
      }
      //
      if (!ctx[keyMock]) {
        ctx[keyMock] = {};
      }
      return ctx[keyMock];
    },
  });
}
