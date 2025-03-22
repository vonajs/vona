import type { ContextBase } from '../../types/context/contextBase.ts';
import type { VonaContext } from '../../types/context/index.ts';
import type { MetadataKey } from './metadata.ts';
import { AsyncResource } from 'node:async_hooks';
import { cast } from '../../types/utils/cast.ts';
import { BeanContainer } from '../bean/beanContainer.ts';
import { appResource } from './resource.ts';

const BEAN = Symbol.for('Context#__bean');
const INNERACCESS = Symbol.for('Context#__inneraccess');
const CTXCALLER = Symbol.for('Context#__ctxcaller');
const TAILCALLBACKS = Symbol.for('Context#__tailcallbacks');
const DBLEVEL = Symbol.for('Context#__dblevel');
const ONIONSDYNAMIC = Symbol.for('Context#__onionsdynamic');

export const contextBase: ContextBase = {
  get bean(): BeanContainer {
    const self = cast(this);
    if (!self[BEAN]) {
      self[BEAN] = BeanContainer.create(self.app, self);
    }
    return self[BEAN];
  },
  get locale() {
    const self = cast(this);
    return self.__getLocale();
  },
  set locale(value) {
    const self = cast(this);
    self.__setLocale(value);
  },
  get instanceName(): string | undefined | null {
    const self = cast(this);
    return self.__getInstanceName();
  },
  set instanceName(value: string | undefined | null) {
    const self = cast(this);
    self.__setInstanceName(value);
  },
  get config() {
    const self = cast(this);
    const serviceInstance = cast(self.app.bean._getBean('a-instance.service.instance' as never));
    return serviceInstance.getConfig(self.instanceName) || self.app.config;
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
  get ctxCaller() {
    return this[CTXCALLER];
  },
  set ctxCaller(value) {
    // ctxCaller
    this[CTXCALLER] = value;
    // todo: 尽量不要在这里设置，容易产生黑盒
    // transaction
    cast(this).dbMeta = value.dbMeta;
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
    }
  },
  get tailCallbacks() {
    if (!this[TAILCALLBACKS]) {
      this[TAILCALLBACKS] = [];
    }
    return this[TAILCALLBACKS];
  },

  getController() {
    const self = cast(this);
    return self.route?.controller;
  },

  getControllerPrototype(): object | undefined {
    const self = cast<VonaContext>(this);
    const controller = self.getController();
    if (!controller) return undefined;
    return controller.prototype;
  },

  getControllerBeanFullName(): string | undefined {
    const self = cast<VonaContext>(this);
    const controller = self.getController();
    if (!controller) return undefined;
    const beanOptions = appResource.getBean(controller);
    return beanOptions?.beanFullName;
  },

  getHandler() {
    const self = cast(this);
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

  get acceptJSON(): boolean {
    const self = cast<VonaContext>(this);
    if (self.path.endsWith('.json')) return true;
    if (self.response.type && self.response.type.includes('json')) return true;
    if (self.accepts('html', 'text', 'json') === 'json') return true;
    return false;
  },

  redirect(url: string, status?: 301 | 302): void {
    const self = cast<VonaContext>(this);
    return self.app.redirect(url, status);
  },
};
