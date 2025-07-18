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

  protected __init__(clientName: keyof IRedisClientRecord) {
    // instance
    this._redisInstance = this._createClient(clientName);
  }

  protected async __dispose__() {
    await this._redisInstance?.quit();
  }

  private _createClient(clientName: keyof IRedisClientRecord): Redis {
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
}
