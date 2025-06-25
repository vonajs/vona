import type { RedisOptions } from 'ioredis';
import type { ConfigRedisCluster, IRedisClientRecord } from '../types/redis.ts';
import { Redis } from 'ioredis';
import { BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRedisClient extends BeanBase {
  private _redisInstance: Redis;

  get instance(): Redis {
    return this._redisInstance;
  }

  protected __init__(clientName?: string) {
    // instance
    this._redisInstance = this._createClient(clientName);
  }

  protected async __dispose__() {
    await this._redisInstance?.quit();
  }

  private _createClient(clientName?: string): Redis {
    clientName = clientName || 'default';
    const configRedis = this.app.config.redis;
    const configClient = configRedis.clients[clientName];
    if (!configClient) throw new Error(`redis client not found: ${clientName}`);
    if (cast<RedisOptions>(configClient).sentinels) {
      // sentinels
      return new Redis(configClient);
    } else if (cast<ConfigRedisCluster>(configClient).nodes) {
      return new Redis.Cluster(
        cast<ConfigRedisCluster>(configClient).nodes,
        cast<ConfigRedisCluster>(configClient),
      ) as unknown as Redis;
    } else {
      const configNode = deepExtend({}, configRedis.default, configClient);
      return new Redis(configNode);
    }
  }

  async clearAllData() {
    const app = this.app;
    // clear keys
    // await this._clearRedisKeys(app.bean.redis.get('limiter'), `b_${app.name}:*`);
    await this._clearRedisKeys(app.bean.redis.get('queue'), `bull_${app.name}:*`);
    // broadcast channel has subscribed
    // await _clearRedisKeys(app.redis.get('broadcast'), `broadcast_${app.name}:*`);
    // redlock
    for (const clientName of this.$scope.redlock.config.redlock.clients) {
      await this._clearRedisKeys(app.bean.redis.get(clientName), `redlock_${app.name}:*`);
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
