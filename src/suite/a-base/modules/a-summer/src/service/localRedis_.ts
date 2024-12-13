import { CacheBase } from '../common/cacheBase.js';
import { IORedis, Service } from 'vona';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';
import { TSummerCacheActionOptions } from '../types/summerCache.js';

@Service()
export class ServiceLocalRedis<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  _redisSummer: IORedis.Redis;

  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const redisKey = this._getRedisKey(keyHash);
    const _value = await this.redisSummer.get(redisKey);
    let value: DATA | null | undefined = _value ? JSON.parse(_value) : undefined;
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      await this.redisSummer.set(redisKey, JSON.stringify(value), 'PX', this._cacheOpitons.redis!.ttl);
    }
    return value;
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
          Math.trunc(this._cacheOpitons.redis!.ttl / 1000),
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
      const clientName = this._cacheOpitons.redis?.client ?? this.scopeSummer.config.summer.redis.client;
      this._redisSummer = this.app.redis.get(clientName);
    }
    return this._redisSummer;
  }

  _getRedisKey(keyHash: '*' | string) {
    const iid = this.ctx.instance ? this.ctx.instance.id : 0;
    return `${iid}!${this._cacheName}!${keyHash}`;
  }
}
