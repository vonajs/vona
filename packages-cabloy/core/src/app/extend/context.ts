import raw from 'raw-body';
import inflate from 'inflation';
import * as ModuleInfo from '@cabloy/module-info';
import { CtxMeta } from '../../lib/core/metaCtx.js';
import DbTransaction from '../../lib/base/dbTransaction.js';
import { ContextBase } from '../../type/context/contextBase.js';

const MODULE = Symbol.for('Context#__module');
const META = Symbol.for('Context#__meta');
const DATABASE = Symbol.for('Context#__database');
const DATABASEMETA = Symbol.for('Context#__databasemeta');
const INNERACCESS = Symbol.for('Context#__inneraccess');
const SUBDOMAIN = Symbol.for('Context#__subdomain');
const CTXCALLER = Symbol.for('Context#__ctxcaller');
const TAILCALLBACKS = Symbol.for('Context#__tailcallbacks');
const DBLEVEL = Symbol.for('Context#__dblevel');

const context: ContextBase = {
  get module() {
    if (this[MODULE] === undefined) {
      const url = (<any>this).req.mockUrl || (<any>this).req.url || '';
      let info;
      if (url.indexOf('/api/static/public/') === 0) {
        info = null;
      } else {
        info = ModuleInfo.parseInfo(ModuleInfo.parseName(url));
      }
      if (!info) {
        info = ModuleInfo.parseInfo('a-base');
      }
      if (info) {
        const module = (<any>this).app.meta.modules[info.relativeName];
        // should not throw error, because the url maybe not valid
        // if (!module) throw new Error(`module not found: ${info.relativeName}`);
        this[MODULE] = module || null;
      } else {
        this[MODULE] = null;
      }
    }
    return this[MODULE];
  },
  get meta() {
    if (!this[META]) {
      this[META] = (<any>this).bean._newBean(CtxMeta);
    }
    return this[META];
  },
  get db() {
    if (!this[DATABASE]) {
      this[DATABASE] = this.meta.util.createDatabase();
    }
    return this[DATABASE];
  },
  set db(value) {
    this[DATABASE] = value;
  },
  get dbMeta() {
    if (!this[DATABASEMETA]) {
      this[DATABASEMETA] = {
        master: true,
        transaction: new DbTransaction(this),
      };
    }
    return this[DATABASEMETA];
  },
  set dbMeta(metaCaller) {
    // transaction
    if (metaCaller.transaction.inTransaction) {
      this.dbMeta.master = false; // false only on metaCaller.transaction=true
      this.dbMeta.transaction = metaCaller.transaction;
    }
  },
  get transaction() {
    return this.dbMeta.transaction;
  },
  get innerAccess() {
    return this[INNERACCESS];
  },
  set innerAccess(value) {
    this[INNERACCESS] = value;
  },
  get dbLevel() {
    return this[DBLEVEL] || 0;
  },
  set dbLevel(value) {
    this[DBLEVEL] = value;
  },
  get subdomain() {
    return typeof this[SUBDOMAIN] === 'undefined' ? (<any>this).subdomains.join('.') : this[SUBDOMAIN];
  },
  set subdomain(value) {
    this[SUBDOMAIN] = value;
  },
  get ctxCaller() {
    return this[CTXCALLER];
  },
  set ctxCaller(value) {
    // ctxCaller
    this[CTXCALLER] = value;
    // innerAccess
    this.innerAccess = true;
    // transaction
    this.dbMeta = value.dbMeta;
    // dbLevel
    this.dbLevel = value.dbLevel;
  },
  get cache() {
    return (<any>this).bean.cache;
  },
  tail(cb) {
    if (!this.dbMeta.master) {
      this.ctxCaller.tail(cb);
    } else {
      this.tailCallbacks.push(cb);
    }
  },
  async tailDone() {
    while (true) {
      const cb = this.tailCallbacks.shift();
      if (!cb) break;
      await cb();
      // try {
      //   await cb();
      // } catch (err) {
      //   this.app.logger.error(err);
      // }
    }
  },
  get tailCallbacks() {
    if (!this[TAILCALLBACKS]) {
      this[TAILCALLBACKS] = [];
    }
    return this[TAILCALLBACKS];
  },

  successMore(list, index, size) {
    (<any>this).success({
      list,
      index: index + list.length,
      finished: size === -1 || size === 0 || list.length < size,
    });
  },

  async getPayload(options) {
    return await raw(inflate((<any>this).req), options);
  },
};
export default context;
