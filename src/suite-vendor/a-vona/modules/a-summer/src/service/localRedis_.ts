import { Redis } from 'ioredis';
import { CacheBase } from '../common/cacheBase.js';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';
import { TSummerCacheActionOptions } from '../types/summerCache.js';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceLocalRedis<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  _redisSummer: Redis;

  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKey = this._getRedisKey(keyHash);
    const _value = await this.redisSummer.getex(redisKey, 'PX', this._cacheOptions.redis!.ttl);
    let value: DATA | null | undefined = _value ? JSON.parse(_value) : undefined;
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      await this._set(keyHash, key, value!);
    }
    return value;
  }

  // todo: remove
  /** for internal usage */
  protected async _set(keyHash: string, _key: KEY, value: DATA, ttl?: number) {
    const redisKey = this._getRedisKey(keyHash);
    ttl = ttl ?? this._cacheOptions.redis!.ttl;
    if (ttl) {
      await this.redisSummer.set(redisKey, JSON.stringify(value), 'PX', ttl);
    } else {
      await this.redisSummer.set(redisKey, JSON.stringify(value));
    }
  }

  // todo: remove
  /** for internal usage */
  protected async _getset(keyHash: string, _key: KEY, value: DATA, ttl?: number) {
    const redisKey = this._getRedisKey(keyHash);
    ttl = ttl ?? this._cacheOptions.redis!.ttl;
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

  async mget(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // peek
    const redisKeys = keysHash.map(keyHash => this._getRedisKey(keyHash));
    const _values = await this.redisSummer.mget(redisKeys);
    const values: Array<DATA | null | undefined> = _values.map(v => (v ? JSON.parse(v) : undefined));
    const redisKeysMissing: any[] = [];
    const keysHashMissing: any[] = [];
    const keysMissing: any[] = [];
    const indexesMissing: any[] = [];
    for (let i = 0; i < values.length; i++) {
      if (this.__checkValueEmpty(values[i], options)) {
        redisKeysMissing.push(redisKeys[i]);
        keysHashMissing.push(keysHash[i]);
        keysMissing.push(keys[i]);
        indexesMissing.push(i);
      }
    }
    // mget
    if (keysHashMissing.length > 0) {
      const layered = this.__getLayered(options);
      const valuesMissing = await layered.mget(keysHashMissing, keysMissing, options);
      // console.log('-------redis:', valuesMissing);
      // set/merge
      const multi = this.redisSummer.multi();
      for (let i = 0; i < keysHashMissing.length; i++) {
        const valueMissing = valuesMissing[i];
        multi.setex(
          redisKeysMissing[i],
          Math.trunc(this._cacheOptions.redis!.ttl / 1000),
          JSON.stringify(valueMissing),
        );
        values[indexesMissing[i]] = valueMissing;
      }
      await multi.exec();
    }
    // ok
    return values;
  }

  async del(keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKey = this._getRedisKey(keyHash);
    await this.redisSummer.del(redisKey);
  }

  async mdel(keysHash: string[], _keys: KEY[], _options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKeys = keysHash.map(keyHash => this._getRedisKey(keyHash));
    await this.redisSummer.del(redisKeys);
  }

  async clear(_options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKey = this._getRedisKey('*');
    const keyPrefix = this.redisSummer.options.keyPrefix;
    const keyPattern = `${keyPrefix}${redisKey}`;
    const keys = await this.redisSummer.keys(keyPattern);
    const keysDel: any[] = [];
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substring(keyPrefix.length) : fullKey;
      keysDel.push(key);
    }
    if (keysDel.length > 0) {
      await this.redisSummer.del(keysDel);
    }
  }

  async peek(keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKey = this._getRedisKey(keyHash);
    const _value = await this.redisSummer.get(redisKey);
    const value: DATA | null | undefined = _value ? JSON.parse(_value) : undefined;
    // need not call layered.peek
    // if (this.__checkValueEmpty(value, options)) {
    //   const layered = this.__getLayered(options);
    //   value = await layered.peek(keyHash, key, options);
    // }
    return value;
  }

  __getLayered(_options?: TSummerCacheActionOptions<KEY, DATA>) {
    return this.localFetch;
  }

  get redisSummer() {
    if (!this._redisSummer) {
      const clientName = this._cacheOptions.redis?.client ?? this.scopeSummer.config.summer.redis.client;
      this._redisSummer = this.bean.redis.get(clientName);
    }
    return this._redisSummer;
  }

  _getRedisKey(keyHash: '*' | string) {
    const iid = this.ctx.instance ? this.ctx.instance.id : 0;
    return `${iid}!${this._cacheName}!${keyHash}`;
  }
}
