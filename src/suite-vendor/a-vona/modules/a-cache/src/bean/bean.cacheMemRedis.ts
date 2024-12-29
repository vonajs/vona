import { BeanBase, cast } from 'vona';
import { Virtual } from 'vona-module-a-bean';
import { IDecoratorCacheRedisOptions } from '../types/cacheRedis.js';
import { BeanSummerCacheBase, IDecoratorSummerCacheOptions } from 'vona-module-a-summer';

const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

@Virtual()
export class BeanCacheRedisBase<KEY = any, DATA = any> extends BeanBase {
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
    const onionOptions = this.onionOptions as IDecoratorCacheRedisOptions;
    return {
      enable: onionOptions.enable,
      meta: onionOptions.meta,
      mode: 'redis',
      redis: {
        ttl: onionOptions.ttl,
        client: onionOptions.client || this.$scope.cache.config.redis.client,
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

  public async get(key?: KEY): Promise<DATA | null | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    return await cache.get(key!);
  }

  public async peek(key?: KEY): Promise<DATA | null | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    return await cache.peek(key!);
  }

  public async set(value: DATA): Promise<void>;
  public async set(key: KEY | undefined, value: DATA): Promise<void>;
  public async set(key?: KEY | DATA, value?: DATA): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    if (arguments.length === 1) {
      value = key as DATA;
      key = undefined;
    } else {
      key = key as KEY;
    }
    await cast(cache)._set(key!, value);
  }

  public async getset(value: DATA): Promise<DATA | undefined>;
  public async getset(key: KEY, value: DATA): Promise<DATA | undefined>;
  public async getset(key?: KEY | DATA, value?: DATA): Promise<DATA | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    if (arguments.length === 1) {
      value = key as DATA;
      key = undefined;
    } else {
      key = key as KEY;
      value = value as DATA;
    }
    return await cast(cache)._getset(key!, value);
  }

  async has(key?: KEY): Promise<boolean> {
    return !!(await this.peek(key));
  }

  async remove(key?: KEY): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    await cache.del(key!);
  }

  async clear(): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // del on this worker + broadcast
    await cache.clear();
  }
}
