import { BeanBase, cast } from 'vona';
import { Virtual } from 'vona-module-a-bean';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

@Virtual()
export class BeanCacheMemBase<KEY = any, DATA = any> extends BeanBase {
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
    const onionOptions = this.onionOptions as IDecoratorCacheMemOptions;
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

  private get __cacheInstance(): BeanSummerCacheBase<KEY, DATA> | undefined {
    if (!this.__cacheEnabled) return undefined;
    return this.app.bean.summer.cache<KEY, DATA>(this.__cacheName, this.__cacheOptions);
  }

  private get __cacheInstanceMem() {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const layered = cast(cache).__getLayered();
    return layered.lruCache;
  }

  private __getKeyHash(key: KEY): string {
    const cache = this.__cacheInstance;
    if (!cache) return '';
    return cast(cache).__getKeyHash(key);
  }

  public get(name: KEY): DATA | undefined {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return undefined;
    const keyHash = this.__getKeyHash(name);
    return cacheMem.get(keyHash);
  }

  public set(name: KEY, value: DATA, timeout?: number) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return;
    const keyHash = this.__getKeyHash(name);
    cacheMem.set(keyHash, value, { ttl: timeout || 0 });
  }

  public getset(name: KEY, value: DATA, timeout?: number) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return;
    const valueOld = this.get(name);
    this.set(name, value, timeout);
    return valueOld;
  }

  has(name: KEY) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return false;
    const keyHash = this.__getKeyHash(name);
    return cacheMem.has(keyHash);
  }

  remove(name: KEY) {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // del on this worker + broadcast
    cache.del(name);
  }

  clear() {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // del on this worker + broadcast
    cache.clear();
  }
}
