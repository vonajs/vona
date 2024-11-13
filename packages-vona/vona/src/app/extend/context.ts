import raw from 'raw-body';
import inflate from 'inflation';
import * as ModuleInfo from '@cabloy/module-info';
import { CtxMeta } from '../../lib/core/metaCtx.js';
import { ContextBase } from '../../types/context/contextBase.js';
import { VonaContext } from '../../types/context/index.js';
import { Cast } from '../../types/utils/cast.js';
import { appResource } from '../../lib/index.js';

const MODULE = Symbol.for('Context#__module');
const META = Symbol.for('Context#__meta');
const INNERACCESS = Symbol.for('Context#__inneraccess');
const SUBDOMAIN = Symbol.for('Context#__subdomain');
const CTXCALLER = Symbol.for('Context#__ctxcaller');
const TAILCALLBACKS = Symbol.for('Context#__tailcallbacks');
const DBLEVEL = Symbol.for('Context#__dblevel');

const context: ContextBase = {
  get module() {
    const self = Cast<VonaContext>(this);
    if (this[MODULE] === undefined) {
      const url = self.req.url || '';
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
        const module = self.app.meta.modules[info.relativeName];
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
    const self = Cast<VonaContext>(this);
    if (!this[META]) {
      this[META] = self.bean._newBean(CtxMeta);
    }
    return this[META];
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
    const self = Cast<VonaContext>(this);
    return typeof this[SUBDOMAIN] === 'undefined' ? self.subdomains.join('.') : this[SUBDOMAIN];
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
    Cast(this).dbMeta = value.dbMeta;
    // dbLevel
    this.dbLevel = value.dbLevel;
  },
  get cache() {
    const self = Cast<VonaContext>(this);
    return self.bean._getBean('cache' as any);
  },
  tail(cb) {
    if (!Cast(this).dbMeta.master) {
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
    const self = Cast<VonaContext>(this);
    self.success({
      list,
      index: index + list.length,
      finished: size === -1 || size === 0 || list.length < size,
    });
  },

  async getPayload(options) {
    const self = Cast<VonaContext>(this);
    return await raw(inflate(self.req), options);
  },

  getClass() {
    const self = Cast<VonaContext>(this);
    return self.route.controller;
  },

  getClassBeanFullName(): string {
    const self = Cast<VonaContext>(this);
    const beanOptions = appResource.getBean(self.getClass());
    return beanOptions!.beanFullName;
  },

  getHandler() {
    const self = Cast<VonaContext>(this);
    return self.route.actionDescriptor?.value;
  },
};
export default context;
