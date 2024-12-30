import { Virtual } from 'vona-module-a-bean';
import { IDecoratorCacheRedisOptions } from '../types/cacheRedis.js';
import { CacheBase } from '../common/cacheBase.js';
import { Redis } from 'ioredis';

@Virtual()
export class BeanCacheRedisBase<KEY = any, DATA = any> extends CacheBase<IDecoratorCacheRedisOptions, KEY> {
  private _redisSummer: Redis;

  private get redisSummer() {
    if (!this._redisSummer) {
      const clientName = this._cacheOptions.client ?? this.$scope.cache.config.redis.client;
      this._redisSummer = this.bean.redis.get(clientName);
    }
    return this._redisSummer;
  }

  protected get __cacheInstance(): Redis | undefined {
    if (!this.__cacheEnabled) return undefined;
    return this.redisSummer;
  }

  public async get(key?: KEY): Promise<DATA | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const redisKey = this.__getRedisKey(key);
    const _value = await cache.getex(redisKey, 'PX', this._cacheOptions.ttl);
    return _value ? JSON.parse(_value) : undefined;
  }

  public async peek(key?: KEY): Promise<DATA | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const redisKey = this.__getRedisKey(key);
    const _value = await cache.get(redisKey);
    return _value ? JSON.parse(_value) : undefined;
  }

  public async set(value?: DATA, key?: KEY, ttl?: number): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    ttl = ttl ?? this._cacheOptions.ttl;
    if (ttl) {
      await cache.set(redisKey, JSON.stringify(value), 'PX', ttl);
    } else {
      await cache.set(redisKey, JSON.stringify(value));
    }
  }

  public async getset(value?: DATA, key?: KEY, ttl?: number): Promise<DATA | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    ttl = ttl ?? this._cacheOptions.ttl;
    let valuePrev: any;
    if (ttl) {
      const res = await this.redisSummer.multi().get(redisKey).set(redisKey, JSON.stringify(value), 'PX', ttl).exec();
      valuePrev = res && res[0][1];
    } else {
      const res = await this.redisSummer.multi().get(redisKey).set(redisKey, JSON.stringify(value)).exec();
      valuePrev = res && res[0][1];
    }
    return valuePrev ? JSON.parse(valuePrev) : undefined;
  }

  public async has(key?: KEY): Promise<boolean> {
    const cache = this.__cacheInstance;
    if (!cache) return false;
    const redisKey = this.__getRedisKey(key);
    const _value = await cache.get(redisKey);
    return !!_value;
  }

  public async del(key?: KEY): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    await cache.del(redisKey);
  }

  public async mdel(keys?: KEY[]): Promise<void> {
    if (!keys || keys.length === 0) return;
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKeys = keys.map(key => this.__getRedisKey(key));
    await cache.del(redisKeys);
  }

  public async clear(): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey('*');
    const keyPrefix = cache.options.keyPrefix;
    const keyPattern = `${keyPrefix}${redisKey}`;
    const keys = await cache.keys(keyPattern);
    const keysDel: any[] = [];
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substring(keyPrefix.length) : fullKey;
      keysDel.push(key);
    }
    if (keysDel.length > 0) {
      await cache.del(keysDel);
    }
  }

  private __getRedisKey(key?: KEY | '*'): string {
    const keyHash = key === '*' ? '*' : this.__getKeyHash(key);
    const iid = this.ctx.instance ? this.ctx.instance.id : 0;
    return `${iid}!${this._cacheName}!${keyHash}`;
  }
}
