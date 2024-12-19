import { Bean } from 'vona-module-a-bean';
import { BeanBase, deepExtend } from 'vona';

import * as uuid from 'uuid';
import currency from '@zhennann/currency';
import moment from 'moment';
import * as ModuleInfo from '@cabloy/module-info';
import eggBornUtils from 'egg-born-utils';
import utils from '../common/utils.js';
import { SelectOptionsPage } from '../types.js';

@Bean()
export class BeanUtil extends BeanBase {
  get configModule() {
    return this.scope.config;
  }

  get uuid() {
    return uuid;
  }

  uuidv4() {
    return uuid.v4().replace(/-/g, '');
  }

  page(page?: SelectOptionsPage, force = true): SelectOptionsPage {
    const pageSize = this.configModule.pageSize;
    let page2: SelectOptionsPage;
    if (!page) {
      page2 = force ? { index: 0 } : { index: 0, size: 0 };
    } else {
      page2 = page;
    }
    if (page2.size === undefined || (force && (page2.size === 0 || page2.size === -1 || page2.size > pageSize))) {
      page2.size = pageSize;
    }
    return page2;
  }

  user(_user) {
    return _user || this.ctx.state.user.op;
  }

  extend(...args) {
    return deepExtend(...args);
  }

  currency(options) {
    return currency(options);
  }

  moment(date?) {
    return moment(date);
  }

  now(fmt?, locale?) {
    return this.formatDateTime(null, fmt, locale);
  }

  today(fmt?, locale?) {
    return this.formatDate(null, fmt, locale);
  }

  formatDateTime(date, fmt?, locale?) {
    locale = locale || this.ctx.locale;
    let timezone = this.configModule.timezones[locale];
    if (timezone === undefined) {
      timezone = this.configModule.timezones[this.app.config.i18n.defaultLocale];
    }
    date = date || new Date();
    fmt = fmt || 'YYYY-MM-DD HH:mm:ss';
    if (typeof date !== 'object') date = new Date(date);
    return moment(date).utcOffset(timezone).format(fmt);
  }

  formatDate(date, sep?, locale?) {
    if (sep === undefined) sep = '-';
    const fmt = `YYYY${sep}MM${sep}DD`;
    return this.formatDateTime(date, fmt, locale);
  }

  formatTime(date, sep?, locale?) {
    if (sep === undefined) sep = ':';
    const fmt = `HH${sep}mm${sep}ss`;
    return this.formatDateTime(date, fmt, locale);
  }

  // todo: load locales resources and then format
  fromNow(date /* , locale*/) {
    if (typeof date !== 'object') date = new Date(date);
    return moment(date).fromNow();
  }

  replaceTemplate(content, scope) {
    if (!content) return null;
    return content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length);
      }
      const value = this.getProperty(scope, key);
      return value !== undefined ? value : '';
    });
  }

  setProperty(obj, name, value) {
    const names = name.split('.');
    if (names.length === 1) {
      obj[name] = value;
    } else {
      for (let i = 0; i < names.length - 1; i++) {
        const _obj = obj[names[i]];
        if (_obj) {
          obj = _obj;
        } else {
          obj = obj[names[i]] = {};
        }
      }
      obj[names[names.length - 1]] = value;
    }
  }

  getProperty(obj, name, sep?) {
    return this._getProperty(obj, name, sep, false);
  }

  getPropertyObject(obj, name, sep?) {
    return this._getProperty(obj, name, sep, true);
  }

  _getProperty(obj, name, sep, forceObject) {
    if (!obj) return undefined;
    const names = name.split(sep || '.');
    // loop
    for (const name of names) {
      if (obj[name] === undefined || obj[name] === null) {
        if (forceObject) {
          obj[name] = {};
        } else {
          obj = obj[name];
          break;
        }
      }
      obj = obj[name];
    }
    return obj;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  combinePagePath(moduleName, arg) {
    if (!arg || typeof arg !== 'string') return arg;
    const first = arg.charAt(0);
    if (first === '/' || first === '#') return arg;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    return `/${moduleInfo.url}/${arg}`;
  }

  checkDemo(throwError = true) {
    const demo = this.configModule.configFront.demo;
    if (!demo.enable) return true;
    const user = this.ctx.state.user;
    // !user means system operation
    if (!user || user.op.userName === 'root') return true;
    if (throwError) {
      this.scope.error.DisabledOnDemoMode.throw();
    }
    return false;
  }

  checkDemoForAtomCreate(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/create') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  checkDemoForAtomRead(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/read') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  checkDemoForAtomSelect(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/select') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  checkDemoForAtomWrite(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/write') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  checkDemoForAtomEnable(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/enable') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  checkDemoForAtomDisable(throwError = true) {
    const ctxCaller = this.ctx.ctxCaller;
    if (!ctxCaller) return true;
    if (ctxCaller.path === '/api/a/base/atom/disable') {
      return this.checkDemo(throwError);
    }
    return true;
  }

  escapeHtml(str) {
    return utils.escapeHtml(str);
  }

  escapeURL(str) {
    return utils.escapeURL(str);
  }

  getTitleLocale({ locales, title, locale }: any) {
    locale = locale || this.ctx.locale;
    let titleLocale = this.getProperty(locales, `${locale}.${title}`);
    if (!titleLocale && locale !== 'en-us') {
      titleLocale = this.getProperty(locales, `en-us.${title}`);
    }
    // not use system locale
    // if (!titleLocale) {
    //   titleLocale = this.app.text(title);
    // }
    return titleLocale || title;
  }

  getFrontScene() {
    return (
      (this.ctx.request.query && this.ctx.request.query['x-scene']) ||
      (this.ctx.headers && this.ctx.headers['x-scene']) ||
      (this.ctx.session && this.ctx.session['x-scene'])
    );
  }

  getFrontClientId() {
    return (
      (this.ctx.request.query && this.ctx.request.query['x-clientid']) ||
      (this.ctx.headers && this.ctx.headers['x-clientid']) ||
      (this.ctx.session && this.ctx.session['x-clientid']) ||
      ''
    );
  }

  evaluateExpression({ expression, globals, wrapper }: any) {
    return eggBornUtils.tools.evaluateExpression({ expression, scope: globals, wrapper });
    // return vm.runInContext(expression, vm.createContext(globals || {}));
  }

  normalizeResourceKey(key, module, sep = ':') {
    if (!key) return key;
    let _sep, _parts;
    for (_sep of sep) {
      _parts = key.split(_sep);
      if (_parts.length > 1) break;
    }
    if (_parts.length === 1 && module) {
      _parts.unshift(module);
    }
    return _parts.join(_sep);
  }

  hostUtil(options) {
    const self = this;
    return {
      text(text, ...args) {
        const locale = options && options.locale;
        return self.ctx.app.text.locale(locale || self.ctx.app.config.i18n.defaultLocale, text, ...args);
      },
      url(str) {
        if (str && (str.indexOf('http://') === 0 || str.indexOf('https://') === 0)) return this.escapeURL(str);
        if (str[0] !== '/') str = '/' + str;
        return self.ctx.app.bean.base.getAbsoluteUrl(this.escapeURL(str));
      },
      urlFront(str) {
        return this.url(str);
      },
      escapeHtml(str) {
        return self.escapeHtml(str);
      },
      escapeURL(str) {
        return self.escapeURL(str);
      },
      performAction(method, path, { body }: any) {
        return self.bean.executor.performAction(method, path, { body });
      },
    };
  }

  // check draft/formal
  async checkAtomIdExists({ atomId, items }: any) {
    if (items.length === 0) return false;
    const atomIds = new Set([atomId]);
    const _atomOld = await this.app.bean.atom.modelAtom.get({ id: atomId });
    if (_atomOld) {
      if (_atomOld.atomIdDraft) {
        atomIds.add(_atomOld.atomIdDraft);
      }
      if (_atomOld.atomIdFormal) {
        atomIds.add(_atomOld.atomIdFormal);
      }
    }
    return items.some(item => {
      return !atomIds.has(item.id);
    });
  }

  checkIfSameAtomClass(atomClassA, atomClassB) {
    return (
      atomClassA &&
      atomClassB &&
      atomClassA.module === atomClassB.module &&
      atomClassA.atomClassName === atomClassB.atomClassName
    );
  }

  parseIdSafe(id?) {
    if (!id) return 0;
    if (!isNaN(id)) return parseInt(id);
    return this.parseTokenSafe(id);
  }

  parseTokenSafe(token?) {
    if (!token) return token;
    return token.replace(/[\\\.*#%'"`;, ]/g, '');
  }

  ensureArray(arr, sep?) {
    if (sep === undefined) sep = ',';
    if (!arr) return arr;
    if (Array.isArray(arr)) return arr;
    if (typeof arr === 'string') return arr.split(sep);
    throw new Error(`invalid array: ${arr}`);
  }

  parseAtomClass({ module, atomClassName }: any) {
    if (!atomClassName) return null;
    let parts;
    if (atomClassName.indexOf(':') > -1) {
      parts = atomClassName.split(':');
    } else if (atomClassName.indexOf('.') > -1) {
      parts = atomClassName.split('.');
    } else {
      parts = [module, atomClassName];
    }
    return {
      module: parts[0],
      atomClassName: parts[1],
    };
  }

  combineBeanFullName({
    module,
    scene,
    bean,
  }: {
    module?: string;
    scene: string;
    bean: string | { module?: string; name: string };
  }) {
    let beanFullName;
    if (typeof bean === 'string') {
      beanFullName = `${module}.${scene}.${bean}`;
    } else {
      beanFullName = `${bean.module || module}.${scene}.${bean.name}`;
    }
    return beanFullName;
  }
}
