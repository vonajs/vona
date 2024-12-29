import { BeanBase, cast } from 'vona';
import LRUCache from 'lru-cache';
import { IMetaOptionsCacheMem } from '../types/cacheMem.js';

const SUMMERCACHEMEMORY = Symbol('APP#__SUMMERCACHEMEMORY');
const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

export class BeanCacheMemBase extends BeanBase {
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
    if (!this.__cacheEnabled) return undefined;
    const cache = this.app.bean.summer.cache(this.__cacheName, this.__cacheOptions);
    const layered = cast(cache).__getLayered();
    return layered.lruCache;
  }

  private _get(name: string): any | undefined {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    return cache.get(name);
  }

  private _set(name: string, value: any, timeout?: number) {
    const cache = this.__cacheInstance;
    if (!cache) return;
    cache.set(name, value, { ttl: timeout || 0 });
  }

  private _getset(name: string, value: any, timeout?: number) {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const valueOld = this._get(name);
    this._set(name, value, timeout);
    return valueOld;
  }

  has(name: string) {
    const cache = this.__cacheInstance;
    if (!cache) return false;
    return cache.has(name);
  }

  remove(name: string) {
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
