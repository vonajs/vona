import * as ModuleInfo from '@cabloy/module-info';
import fse from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import is from 'is-type-of';
import * as security from 'egg-security';
import Redlock from 'redlock';
import { Request } from 'egg';
import { CabloyContext } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { IModuleMiddlewareGate } from '../bean/index.js';

const __EnvTests = ['unittest', 'test'];

export interface IExecuteBeanCallbackParams {
  ctx: CabloyContext;
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

  combineFetchPath(moduleName, arg) {
    if (arg.substr(0, 2) === '//') return arg.substr(1);
    if (arg.charAt(0) === '/') return `/api${arg}`;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error('invalid url');
    return `/api/${moduleInfo.url}/${arg}`;
  }

  combineApiPath(moduleName, arg) {
    if (arg.charAt(0) === '/') return arg;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
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
    if (data.stack) error.stack = data.stack;
    if (data.name) error.name = data.name;
    if (data.errno) (<any>error).errno = data.errno;
    if (data.sqlMessage) (<any>error).sqlMessage = data.sqlMessage;
    if (data.sqlState) (<any>error).sqlState = data.sqlState;
    if (data.index) (<any>error).index = data.index;
    if (data.sql) (<any>error).sql = data.sql;
    return error;
  }

  async monkeyModule(ebAppMonkey, ebModulesMonkey, monkeyName, monkeyData) {
    // self
    const module = monkeyData && monkeyData.module;
    if (module) {
      if (module.mainInstance && module.mainInstance[monkeyName]) {
        await module.mainInstance[monkeyName](monkeyData);
      }
    }
    // module monkey
    for (const key in ebModulesMonkey) {
      const moduleMonkey = ebModulesMonkey[key];
      if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
        const monkeyData2 = Object.assign({ moduleSelf: moduleMonkey }, monkeyData);
        await moduleMonkey.monkeyInstance[monkeyName](monkeyData2);
      }
    }
    // app monkey
    if (ebAppMonkey && ebAppMonkey[monkeyName]) {
      await ebAppMonkey[monkeyName](monkeyData);
    }
  }

  getWhiteListCors(ctx) {
    let whiteListCors;
    const _config = ctx.config.module('a-base');
    const _whiteList = (_config && _config.cors && _config.cors.whiteList) || [];
    if (!Array.isArray(_whiteList)) {
      whiteListCors = _whiteList.split(',');
    } else {
      whiteListCors = _whiteList.concat();
    }
    // inherits from jsonp
    let _whiteListJsonp = _config && _config.jsonp && _config.jsonp.whiteList;
    if (_whiteListJsonp) {
      if (!Array.isArray(_whiteListJsonp)) {
        _whiteListJsonp = _whiteListJsonp.split(',');
      }
      whiteListCors = whiteListCors.concat(_whiteListJsonp);
    }
    // hostSelf
    const hostSelf = ctx.bean.base.getAbsoluteUrl();
    if (hostSelf) {
      whiteListCors.push(hostSelf);
    }
    // ok
    return whiteListCors;
  }

  isSafeDomain(ctx, origin) {
    // origin is {protocol}{hostname}{port}...
    if (!origin || origin === 'null' || origin === null) return true;

    let parsedUrl;
    try {
      parsedUrl = new URL(origin);
    } catch (err) {
      return false;
    }

    // whiteList
    const whiteListCors = this.getWhiteListCors(ctx);
    if (
      security.utils.isSafeDomain(parsedUrl.hostname, whiteListCors) ||
      security.utils.isSafeDomain(origin, whiteListCors)
    ) {
      return true;
    }
    return false;
  }

  compose(chains, adapter) {
    if (!chains) chains = [];
    return function (context, next?) {
      // last called middleware #
      let index = -1;
      return dispatch(0);
      function dispatch(i) {
        if (i <= index) return new Error('next() called multiple times');
        index = i;
        let receiver;
        let fn;
        const chain = chains[i];
        if (chain) {
          const obj = adapter(context, chain);
          if (!obj) return dispatch(i + 1);
          receiver = obj.receiver;
          fn = obj.fn;
          if (!fn) return new Error('fn is not defined');
        }
        if (i === chains.length) fn = next;
        if (!fn) return;
        return fn.call(receiver, context, function next() {
          return dispatch(i + 1);
        });
      }
    };
  }

  composeAsync(chains, adapter) {
    if (!chains) chains = [];
    return function (context, next?) {
      // last called middleware #
      let index = -1;
      return dispatch(0);
      function dispatch(i) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));
        index = i;
        let receiver;
        let fn;
        const chain = chains[i];
        if (chain) {
          const obj = adapter(context, chain);
          if (!obj) return dispatch(i + 1);
          receiver = obj.receiver;
          fn = obj.fn;
          if (!fn) return Promise.reject(new Error('fn is not defined'));
        }
        if (i === chains.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          const res = fn.call(receiver, context, function next() {
            return dispatch(i + 1);
          });
          return Promise.resolve(res);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    };
  }

  async createAnonymousContext({ locale, subdomain, module, instance }): Promise<CabloyContext> {
    // url
    const url = module ? this.combineFetchPath(module, '') : '/api/a/base/';
    // ctx
    const ctx = this.app.createAnonymousContext({
      method: 'post',
      url,
    } as Request);
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
      ctx.instance = await ctx.bean.instance.get({ subdomain });
      // start instance
      if (instance) {
        await ctx.bean.instance.checkAppReadyInstance();
      }
    }
    // ok
    return ctx as unknown as CabloyContext;
  }

  async executeBean({
    locale,
    subdomain,
    beanModule,
    beanFullName,
    context,
    fn,
    transaction,
    ctxCaller,
    ctxParent,
    instance,
  }: {
    locale?: string;
    subdomain?: string;
    beanModule?: string;
    beanFullName?: string;
    context: any;
    fn?: any;
    transaction?: boolean;
    ctxCaller?: CabloyContext;
    ctxParent?: CabloyContext;
    instance?: boolean;
  }) {
    // ctxModule
    const ctxModule = beanModule || ctxCaller?.module?.info?.relativeName || ctxParent?.module?.info?.relativeName;
    // ctx
    const ctx = await this.createAnonymousContext({ locale, subdomain, module: ctxModule, instance });
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
    const bean = beanFullName ? ctx.bean._getBean(beanFullName) : null;
    if (!bean && beanFullName && !is.function(fn)) {
      throw new Error(`bean not found: ${beanFullName}`);
    }
    // execute
    let res;
    if (transaction) {
      res = await ctx.transaction.begin(async () => {
        return await this._executeBeanFn({ fn, ctx, bean, context });
      });
    } else {
      res = await this._executeBeanFn({ fn, ctx, bean, context });
    }
    // tail done
    await ctx.tailDone();
    // ok
    return res;
  }

  async _executeBeanFn({ fn, ctx, bean, context }) {
    let res;
    if (is.function(fn)) {
      res = await fn({ ctx, bean, context });
    } else {
      fn = fn || 'execute';
      if (!bean[fn]) {
        throw new Error(`bean method not found: ${bean.__beanFullName__}:${fn}`);
      }
      res = await bean[fn](context);
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

  subdomainDesp(subdomain) {
    if (subdomain === undefined || subdomain === null) return '~';
    return subdomain || '-';
  }

  deprecated(oldUsage, newUsage) {
    const message = '`'
      .concat(oldUsage, '` is deprecated and will be removed in a later version. Use `')
      .concat(newUsage, '` instead');
    return console.warn(message);
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

  requireDynamic(file) {
    if (!file) throw new Error('file should not empty');
    let instance = require(file);
    const mtime = this._requireDynamic_getFileTime(file);
    if (instance.__requireDynamic_mtime === undefined) {
      instance.__requireDynamic_mtime = mtime;
    } else if (instance.__requireDynamic_mtime !== mtime) {
      delete require.cache[require.resolve(file)];
      instance = require(file);
      instance.__requireDynamic_mtime = mtime;
    }
    return instance;
  }

  private _requireDynamic_getFileTime(file) {
    if (!path.isAbsolute(file)) return null;
    const exists = fse.pathExistsSync(file);
    if (!exists) return null;
    // stat
    const stat = fse.statSync(file);
    return stat.mtime.valueOf();
  }
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
