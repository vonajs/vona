import type { Redis } from 'ioredis';
import type { IRedisClientRecord } from '../types/redis.ts';
import { BeanBase, getRedisClientKeyPrefix } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRedis extends BeanBase {
  async clearAllData() {
    const app = this.app;
    // clear keys
    // await this._clearRedisKeys(app.bean.redis.get('limiter'), `b_${app.name}:*`);
    await this._clearRedisKeys(app.bean.redis.get('queue'), `${getRedisClientKeyPrefix('bull', app)}*`);
    // broadcast channel has subscribed
    // await _clearRedisKeys(app.redis.get('broadcast'), `${getRedisClientKeyPrefix('broadcast', app)}*`);
    // redlock
    for (const clientName of this.$scope.redlock.config.redlock.clients) {
      await this._clearRedisKeys(app.bean.redis.get(clientName), `${getRedisClientKeyPrefix('redlock', app)}*`);
    }
    for (const clientName in app.config.redis.clients) {
      if (['redlock', 'limiter', 'queue', 'broadcast'].includes(clientName)) continue;
      if (clientName.includes('redlock')) continue;
      const client = app.config.redis.clients[clientName];
      await this._clearRedisKeys(app.bean.redis.get(clientName as keyof IRedisClientRecord), `${client.keyPrefix}*`);
    }
  }

  private async _clearRedisKeys(redis: Redis, pattern: string) {
    if (!redis) return;
    const keyPrefix = redis.options.keyPrefix;
    const keys = await redis.keys(pattern);
    const keysDel: string[] = [];
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substring(keyPrefix.length) : fullKey;
      keysDel.push(key);
    }
    if (keysDel.length > 0) {
      await redis.del(keysDel);
    }
  }
}
