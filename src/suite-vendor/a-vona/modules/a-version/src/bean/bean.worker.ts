import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';
import { Redis } from 'ioredis';

@Bean()
export class BeanWorker extends BeanBase {
  _redisCache: Redis;
  // _redisIO = null;

  get id() {
    return this.app.meta.workerId;
  }

  get redisCache() {
    if (!this._redisCache) this._redisCache = this.bean.redis.get('cache');
    return this._redisCache;
  }

  // get redisIO() {
  //   if (!this._redisIO) this._redisIO = this.app.redis.get('io');
  //   return this._redisIO;
  // }

  async setAlive() {
    const config = this.app.config.modules[__ThisModule__];
    const aliveTimeout = config?.worker.alive.timeout;
    const key = `workerAlive:${this.id}`;
    await this.redisCache.set(key, JSON.stringify(true), 'PX', aliveTimeout * 2);
    // await this.redisIO.set(key, JSON.stringify(true), 'PX', aliveTimeout * 2);
  }

  async getAlive({ id }: any) {
    const key = `workerAlive:${id}`;
    const value = await this.redisCache.get(key);
    return value ? JSON.parse(value) : undefined;
  }
}
