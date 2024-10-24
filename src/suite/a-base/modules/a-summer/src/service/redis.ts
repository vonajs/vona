import { IModuleConfigSummerCacheBase } from '../config/types.js';
import { CacheBase } from './cacheBase.js';
import { Service } from 'vona';

@Service()
export class ServiceRedis extends CacheBase {
  _redisSummer: any;

  constructor({ cacheBase }: { cacheBase: IModuleConfigSummerCacheBase }) {
    super({ cacheBase });
    this._redisSummer = null;
  }

  async get(keyHash, key, options) {
    const redisKey = this._getRedisKey(keyHash);
    let value = await this.redisSummer.get(redisKey);
    value = value ? JSON.parse(value) : undefined;
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      await this.redisSummer.set(redisKey, JSON.stringify(value), 'PX', this._cacheBase.redis!.ttl);
    }
    return value;
  }

  async mget(keysHash, keys, options) {
    // peek
    const redisKeys = keysHash.map(keyHash => this._getRedisKey(keyHash));
    let values = await this.redisSummer.mget(redisKeys);
    values = values.map(v => (v ? JSON.parse(v) : undefined));
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
        multi.setex(redisKeysMissing[i], Math.trunc(this._cacheBase.redis!.ttl / 1000), JSON.stringify(valueMissing));
        values[indexesMissing[i]] = valueMissing;
      }
      await multi.exec();
    }
    // ok
    return values;
  }

  async del(keyHash, _key, _options) {
    _key;
    const redisKey = this._getRedisKey(keyHash);
    await this.redisSummer.del(redisKey);
  }

  async mdel(keysHash, _keys, _options) {
    _keys;
    const redisKeys = keysHash.map(keyHash => this._getRedisKey(keyHash));
    await this.redisSummer.del(redisKeys);
  }

  async clear(_options) {
    const redisKey = this._getRedisKey('*');
    const keyPrefix = this.redisSummer.options.keyPrefix;
    const keyPattern = `${keyPrefix}${redisKey}`;
    const keys = await this.redisSummer.keys(keyPattern);
    const keysDel: any[] = [];
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substr(keyPrefix.length) : fullKey;
      keysDel.push(key);
    }
    if (keysDel.length > 0) {
      await this.redisSummer.del(keysDel);
    }
  }

  async peek(keyHash, _key, _options) {
    _key;
    const redisKey = this._getRedisKey(keyHash);
    let value = await this.redisSummer.get(redisKey);
    value = value ? JSON.parse(value) : undefined;
    // need not call layered.peek
    // if (this.__checkValueEmpty(value, options)) {
    //   const layered = this.__getLayered(options);
    //   value = await layered.peek(keyHash, key, options);
    // }
    return value;
  }

  __getLayered(_options?) {
    return this.localFetch;
  }

  get redisSummer() {
    if (!this._redisSummer) {
      this._redisSummer = this.ctx.app.redis.get('summer');
    }
    return this._redisSummer;
  }

  _getRedisKey(key) {
    const iid = this.ctx.instance ? this.ctx.instance.id : 0;
    return `${iid}!${this._cacheBase.fullKey}!${key}`;
  }
}
