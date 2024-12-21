import raw from 'raw-body';
import inflate from 'inflation';
import { CtxMeta } from '../../lib/core/metaCtx.js';
import { ContextBase } from '../../types/context/contextBase.js';
import { VonaContext } from '../../types/context/index.js';
import { cast } from '../../types/utils/cast.js';
import { appResource, MetadataKey } from '../../lib/index.js';
import { AsyncResource } from 'node:async_hooks';

const META = Symbol.for('Context#__meta');
const INNERACCESS = Symbol.for('Context#__inneraccess');
const SUBDOMAIN = Symbol.for('Context#__subdomain');
const CTXCALLER = Symbol.for('Context#__ctxcaller');
const TAILCALLBACKS = Symbol.for('Context#__tailcallbacks');
const DBLEVEL = Symbol.for('Context#__dblevel');
const ONIONSDYNAMIC = Symbol.for('Context#__onionsdynamic');

const context: ContextBase = {
  get config() {
    const self = cast(this);
    const serviceInstance = cast(self.app.bean._getBean('a-instance.service.instance' as never));
    return serviceInstance.getConfig(self.subdomain) || self.app.config;
  },
  get meta() {
    const self = cast<VonaContext>(this);
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
  get dbLevel(): number {
    return this[DBLEVEL] ?? 0;
  },
  set dbLevel(value: number | undefined) {
    this[DBLEVEL] = value;
  },
  get subdomain() {
    const self = cast<VonaContext>(this);
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
    cast(this).dbMeta = value.dbMeta;
    // dbLevel
    this.dbLevel = value.dbLevel;
  },
  tail(cb) {
    if (!cast(this).dbMeta.master) {
      this.ctxCaller.tail(AsyncResource.bind(cb));
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

  async getPayload(options) {
    const self = cast<VonaContext>(this);
    return await raw(inflate(self.req), options);
  },

  getClass() {
    const self = cast<VonaContext>(this);
    return self.route?.controller;
  },

  getClassPrototype(): object | undefined {
    const self = cast<VonaContext>(this);
    const controller = self.getClass();
    if (!controller) return undefined;
    return controller.prototype;
  },

  getClassBeanFullName(): string | undefined {
    const self = cast<VonaContext>(this);
    const controller = self.getClass();
    if (!controller) return undefined;
    const beanOptions = appResource.getBean(controller);
    return beanOptions?.beanFullName;
  },

  getHandler() {
    const self = cast<VonaContext>(this);
    return self.route?.actionDescriptor?.value;
  },

  getHandlerName(): MetadataKey | undefined {
    const self = cast<VonaContext>(this);
    const handler = self.getHandler();
    if (!handler) return undefined;
    return handler.name;
  },

  get onionsDynamic(): any | undefined {
    return this[ONIONSDYNAMIC];
  },

  set onionsDynamic(value: any | undefined) {
    this[ONIONSDYNAMIC] = value;
  },
};
export default context;
