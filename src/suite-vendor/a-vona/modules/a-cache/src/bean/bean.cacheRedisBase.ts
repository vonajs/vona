import type { Redis } from 'ioredis';
import type { ICacheRedisGetOptions, ICacheRedisSetOptions } from '../types/cache.ts';
import type { IDecoratorCacheRedisOptions } from '../types/cacheRedis.ts';
import { Virtual } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { CacheBase } from '../common/cacheBase.ts';

@Bean()
@Virtual()
export class BeanCacheRedisBase<KEY = any, DATA = any> extends CacheBase<IDecoratorCacheRedisOptions, KEY> {
  private _redisSummer: Redis;

  protected __init__(cacheName?: string, cacheOptions?: IDecoratorCacheRedisOptions) {
    super.__init__(cacheName, cacheOptions);
    this._cacheOptions = Object.assign({}, this.$scope.cache.config.redis.options, this._cacheOptions);
  }

  private get redisSummer() {
    if (!this._redisSummer) {
      this._redisSummer = this.bean.redis.get(this._cacheOptions.client);
    }
    return this._redisSummer;
  }

  protected get __cacheInstance(): Redis | undefined {
    if (!this.__cacheEnabled) return undefined;
    return this.redisSummer;
  }

  public async get(key?: KEY, options?: ICacheRedisGetOptions): Promise<DATA | null | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const redisKey = this.__getRedisKey(key);
    const ttl = options?.ttl ?? this._cacheOptions.ttl;
    const updateAgeOnGet = options?.updateAgeOnGet ?? this._cacheOptions.updateAgeOnGet;
    let _value;
    if (updateAgeOnGet && ttl) {
      _value = await cache.getex(redisKey, 'PX', ttl);
    } else {
      _value = await cache.get(redisKey);
    }
    return _value ? JSON.parse(_value) : undefined;
  }

  public async mget(keys: KEY[], options?: ICacheRedisGetOptions): Promise<Array<DATA | null | undefined>> {
    if (!keys || keys.length === 0) return [];
    const cache = this.__cacheInstance;
    if (!cache) return [];
    const redisKeys = this.__getRedisKeys(keys);
    const _values = await cache.mget(redisKeys);
    const values = _values.map(v => (v ? JSON.parse(v) : undefined));
    const ttl = options?.ttl ?? this._cacheOptions.ttl;
    const updateAgeOnGet = options?.updateAgeOnGet ?? this._cacheOptions.updateAgeOnGet;
    if (updateAgeOnGet && ttl) {
      const redisKeysEx: string[] = [];
      for (let i = 0; i < redisKeys.length; i++) {
        if (_values[i]) {
          redisKeysEx.push(redisKeys[i]);
        }
      }
      let multi = cache.multi();
      for (const redisKey of redisKeysEx) {
        multi = multi.pexpire(redisKey, ttl);
      }
      await multi.exec();
    }
    return values;
  }

  public async peek(key?: KEY): Promise<DATA | null | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return undefined;
    const redisKey = this.__getRedisKey(key);
    const _value = await cache.get(redisKey);
    return _value ? JSON.parse(_value) : undefined;
  }

  public async set(value?: DATA, key?: KEY, options?: ICacheRedisSetOptions): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    const ttl = options?.ttl ?? this._cacheOptions.ttl;
    if (ttl) {
      await cache.set(redisKey, JSON.stringify(value), 'PX', ttl);
    } else {
      await cache.set(redisKey, JSON.stringify(value));
    }
    const db = options?.db ?? this.bean.database.current;
    db?.compensate(async () => {
      await this.del(key);
    });
  }

  public async mset(values: DATA[], keys: KEY[], options?: ICacheRedisSetOptions): Promise<void> {
    if (!values || values.length === 0) return;
    if (!keys || keys.length === 0) return;
    const cache = this.__cacheInstance;
    if (!cache) return;
    const ttl = options?.ttl ?? this._cacheOptions.ttl;
    let multi = cache.multi();
    for (let i = 0; i < keys.length; i++) {
      const redisKey = this.__getRedisKey(keys[i]);
      if (ttl) {
        multi = multi.set(redisKey, JSON.stringify(values[i]), 'PX', ttl);
      } else {
        multi = multi.set(redisKey, JSON.stringify(values[i]));
      }
    }
    await multi.exec();
    const db = options?.db ?? this.bean.database.current;
    db?.compensate(async () => {
      for (const key of keys) {
        await this.del(key);
      }
    });
  }

  public async getset(value?: DATA, key?: KEY, options?: ICacheRedisSetOptions): Promise<DATA | null | undefined> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    const ttl = options?.ttl ?? this._cacheOptions.ttl;
    let valuePrev: any;
    if (ttl) {
      const res = await this.redisSummer.multi().get(redisKey).set(redisKey, JSON.stringify(value), 'PX', ttl).exec();
      valuePrev = res && res[0][1];
    } else {
      const res = await this.redisSummer.multi().get(redisKey).set(redisKey, JSON.stringify(value)).exec();
      valuePrev = res && res[0][1];
    }
    const db = options?.db ?? this.bean.database.current;
    db?.compensate(async () => {
      await this.del(key);
    });
    return valuePrev ? JSON.parse(valuePrev) : undefined;
  }

  public async has(key?: KEY): Promise<boolean> {
    const cache = this.__cacheInstance;
    if (!cache) return false;
    const redisKey = this.__getRedisKey(key);
    const _value = await cache.exists(redisKey);
    return !!_value;
  }

  public async del(key?: KEY): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey(key);
    await cache.del(redisKey);
  }

  public async mdel(keys: KEY[]): Promise<void> {
    if (!keys || keys.length === 0) return;
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKeys = this.__getRedisKeys(keys);
    await cache.del(redisKeys);
  }

  public async clear(): Promise<void> {
    const cache = this.__cacheInstance;
    if (!cache) return;
    const redisKey = this.__getRedisKey('*');
    const keyPrefix = cache.options.keyPrefix;
    const keyPattern = `${keyPrefix}${redisKey}`;
    const keys = await cache.keys(keyPattern);
    const keysDel: string[] = [];
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
    // this.ctx.instance should exist if !disableInstance
    const iid = this._cacheOptions.disableInstance ? 0 : this.ctx.instance.id;
    return `${iid}!${this._cacheName}!${keyHash}`;
  }

  private __getRedisKeys(keys: KEY[]): string[] {
    return keys.map(key => this.__getRedisKey(key));
  }
}
