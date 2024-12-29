import { BeanBase, cast } from 'vona';
import { Virtual } from 'vona-module-a-bean';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { BeanSummerCacheBase, IDecoratorSummerCacheOptions } from 'vona-module-a-summer';

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

  private __cacheOptionsInner(): IDecoratorSummerCacheOptions {
    const onionOptions = this.onionOptions as IDecoratorCacheMemOptions;
    return {
      enable: onionOptions.enable,
      meta: onionOptions.meta,
      mode: 'mem',
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

  public get(key: KEY): DATA | undefined {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return undefined;
    const keyHash = this.__getKeyHash(key);
    return cacheMem.get(keyHash);
  }

  public set(key: KEY, value: DATA, timeout?: number) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return;
    const keyHash = this.__getKeyHash(key);
    cacheMem.set(keyHash, value, { ttl: timeout || 0 });
  }

  public getset(key: KEY, value: DATA, timeout?: number) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return;
    const valueOld = this.get(key);
    this.set(key, value, timeout);
    return valueOld;
  }

  has(key: KEY) {
    const cacheMem = this.__cacheInstanceMem;
    if (!cacheMem) return false;
    const keyHash = this.__getKeyHash(key);
    return cacheMem.has(keyHash);
  }

  remove(key: KEY) {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // del on this worker + broadcast
    cache.del(key);
  }

  clear() {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // del on this worker + broadcast
    cache.clear();
  }
}
