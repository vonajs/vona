import type { ICacheMemGetOptions } from '../types/cache.ts';
import type { IDecoratorCacheMemOptions } from '../types/cacheMem.ts';
import { LRUCache } from 'lru-cache';
import { Virtual } from 'vona-module-a-bean';
import { CacheBase } from '../common/cacheBase.ts';

const SUMMERCACHEMEMORY = Symbol('APP#__SUMMERCACHEMEMORY');

@Virtual()
export class BeanCacheMemBase<KEY = any, DATA = any> extends CacheBase<IDecoratorCacheMemOptions, KEY> {
  protected __init__(cacheName?: string, cacheOptions?: IDecoratorCacheMemOptions) {
    super.__init__(cacheName, cacheOptions);
    this._cacheOptions = Object.assign({}, this.$scope.cache.config.mem.options, this._cacheOptions);
  }

  private get memoryInstance() {
    if (!this.app[SUMMERCACHEMEMORY]) {
      this.app[SUMMERCACHEMEMORY] = {};
    }
    if (!this.app[SUMMERCACHEMEMORY][this.ctx.instanceName]) {
      this.app[SUMMERCACHEMEMORY][this.ctx.instanceName] = {};
    }
    return this.app[SUMMERCACHEMEMORY][this.ctx.instanceName];
  }

  private get lruCache(): LRUCache<string, any> {
    if (!this.memoryInstance[this._cacheName]) {
      this.memoryInstance[this._cacheName] = new LRUCache<string, any>({
        max: this._cacheOptions.max,
        ttl: this._cacheOptions.ttl,
        ttlAutopurge: true,
      } as any);
    }
    return this.memoryInstance[this._cacheName];
  }

  protected get __cacheInstance(): LRUCache<string, any> | undefined {
    if (!this.__cacheEnabled) return undefined;
    return this.lruCache;
  }

  public get(key?: KEY, options?: ICacheMemGetOptions): DATA | null | undefined {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const keyHash = this.__getKeyHash(key);
    return cache.get(keyHash, options);
  }

  public mget(keys: KEY[], options?: ICacheMemGetOptions): Array<DATA | null | undefined> {
    if (!keys || keys.length === 0) return [];
    const cache = this.__cacheInstance;
    if (!cache) return [];
    const keysHash = this.__getKeysHash(keys);
    return keysHash.map(keyHash => cache.get(keyHash, options));
  }

  public peek(key?: KEY): DATA | null | undefined {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const keyHash = this.__getKeyHash(key);
    return cache.peek(keyHash);
  }

  public set(value?: DATA, key?: KEY, ttl?: number): void {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const keyHash = this.__getKeyHash(key);
    ttl = ttl ?? this._cacheOptions.ttl;
    cache.set(keyHash, value, { ttl });
  }

  public mset(values: DATA[], keys: KEY[], ttl?: number): void {
    if (!values || values.length === 0) return;
    if (!keys || keys.length === 0) return;
    const cache = this.__cacheInstance;
    if (!cache) return;
    ttl = ttl ?? this._cacheOptions.ttl;
    for (let i = 0; i < keys.length; i++) {
      const keyHash = this.__getKeyHash(keys[i]);
      cache.set(keyHash, values[i], { ttl });
    }
  }

  public getset(value?: DATA, key?: KEY, ttl?: number): DATA | null | undefined {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const valueOld = this.get(key);
    this.set(value, key, ttl);
    return valueOld;
  }

  has(key?: KEY): boolean {
    const cache = this.__cacheInstance;
    if (!cache) return false;
    const keyHash = this.__getKeyHash(key);
    return cache.has(keyHash);
  }

  del(key?: KEY): void {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const keyHash = this.__getKeyHash(key);
    // del on this worker
    cache.delete(keyHash);
    // del on other workers by broadcast
    this.$scope.cache.broadcast.memDel.emit({
      cacheName: this._cacheName,
      cacheOptions: this._cacheOptions,
      keyHash,
      key,
    });
  }

  mdel(keys: KEY[]): void {
    if (!keys || keys.length === 0) return;
    const cache = this.__cacheInstance;
    if (!cache) return;
    const keysHash = this.__getKeysHash(keys);
    // del on this worker
    keysHash.forEach(keyHash => cache.delete(keyHash));
    // del on other workers by broadcast
    this.$scope.cache.broadcast.memMultiDel.emit({
      cacheName: this._cacheName,
      cacheOptions: this._cacheOptions,
      keysHash,
      keys,
    });
  }

  clear(): void {
    const cache = this.__cacheInstance;
    if (!cache) return;
    // clear on this worker
    cache.clear();
    // clear on other workers by broadcast
    this.$scope.cache.broadcast.memClear.emit({ cacheName: this._cacheName, cacheOptions: this._cacheOptions });
  }

  protected __delRaw(keyHash: string, _key: KEY) {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    cache.delete(keyHash);
  }

  protected __mdelRaw(keysHash: string[], _keys: KEY[]) {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    keysHash.forEach(keyHash => cache.delete(keyHash));
  }

  protected __clearRaw() {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    cache.clear();
  }
}
