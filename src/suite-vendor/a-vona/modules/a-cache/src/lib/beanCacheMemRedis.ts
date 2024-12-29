import { BeanBase } from 'vona';
import LRUCache from 'lru-cache';
import { IMetaOptionsCacheMem } from '../types/cacheMem.js';

const SUMMERCACHEMEMORY = Symbol('APP#__SUMMERCACHEMEMORY');
const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

export class BeanCacheMemRedis extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'get') {
      return (name: any) => {
        return this._get(name);
      };
    } else if (prop === 'set') {
      return (name: any, value: any) => {
        return this._set(name, value);
      };
    }
  }

  get __lruCache(): LRUCache<string, any> {
    if (!this.__memoryInstance[this.__cacheName]) {
      this.__memoryInstance[this.__cacheName] = new LRUCache<string, any>(this._cacheOpitons.mem as any);
    }
    return this.__memoryInstance[this.__cacheName];
  }

  get __memoryInstance() {
    if (!this.app[SUMMERCACHEMEMORY]) {
      this.app[SUMMERCACHEMEMORY] = {};
    }
    if (!this.app[SUMMERCACHEMEMORY][this.ctx.subdomain]) {
      this.app[SUMMERCACHEMEMORY][this.ctx.subdomain] = {};
    }
    return this.app[SUMMERCACHEMEMORY][this.ctx.subdomain];
  }

  private get __cacheName() {
    return this.beanFullName;
  }

  private get __cacheOptions() {
    if (this[SymbolCacheOptions] === undefined) {
      this[SymbolCacheOptions] = this.__cacheOptionsInner();
    }
    return this[SymbolCacheOptions];
  }

  private get __cacheEnabled() {
    if (this[SymbolCacheEnabled] === undefined) {
      this[SymbolCacheEnabled] = this.__cacheEnabledInner();
    }
    return this[SymbolCacheEnabled];
  }

  private __cacheOptionsInner() {
    const onionOptions = this.onionOptions as IMetaOptionsCacheMem;
    return {
      enable: onionOptions.enable,
      meta: onionOptions.meta,
      mem: {
        max: onionOptions.max,
        ttl: onionOptions.ttl,
      },
    };
  }

  private __cacheEnabledInner() {
    // enable
    if (!this.bean.onion.checkOnionOptionsEnabled(this.__cacheOptions)) return false;
    // default
    return true;
  }

  private get __cacheInstance() {
    if (!this.__cacheEnabled) return;
    return this.app.bean.summer.cache(this.__cacheName, this.__cacheOptions);
  }

  private _get(name: string): any | undefined {
    const cache = this.__cacheInstance;
    if (!cache) return;
    return cache.peek(name);
  }

  private _set(name: string, value: any, timeout?: number) {
    this.memory[name] = {
      value,
      timeout: timeout || 0,
      timestamp: new Date(),
    };
  }

  getset(name, value, timeout?) {
    const valueOld = this.get(name);
    this.memory[name] = {
      value,
      timeout: timeout || 0,
      timestamp: new Date(),
    };
    return valueOld;
  }

  has(name) {
    const res = this.memory[name];
    if (!res) return null;
    return res.timeout === 0 || new Date().valueOf() - res.timestamp < res.timeout ? res : null;
  }

  remove(name) {
    // remove this
    this._remove(name);
    // broadcast
    this.scope.broadcast.memRemove.emit({ moduleName: this.moduleScope, name });
  }

  // by broadcast
  _remove(name) {
    delete this.memory[name];
  }

  clear() {
    // clear this
    this._clear();
    // broadcast
    this.scope.broadcast.memClear.emit({ moduleName: this.moduleScope });
  }

  // by broadcast
  _clear() {
    if (
      this.ctx.app[CACHEMEMORY] &&
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain] &&
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain][this.moduleScope]
    ) {
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain][this.moduleScope] = {};
    }
  }

  _clearAll() {
    if (this.ctx.app[CACHEMEMORY] && this.ctx.app[CACHEMEMORY][this.ctx.subdomain]) {
      const aInstance = this.ctx.app[CACHEMEMORY][this.ctx.subdomain]['a-instance'];
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain] = { 'a-instance': aInstance };
    }
  }
}
