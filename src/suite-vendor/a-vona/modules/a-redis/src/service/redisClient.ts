import { Redis, RedisOptions } from 'ioredis';
import { BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';
import { ConfigRedisCluster } from '../types/redis.js';

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

  private _createClient(clientName?: string): Redis {
    clientName = clientName || 'default';
    const configRedis = this.app.config.redis;
    const configClient = configRedis.clients[clientName];
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
