import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { ServiceRedisClient } from '../service/redisClient.js';
import type { IRedisClientRecord } from '../types/redis.js';

@Bean()
export class BeanRedis extends BeanBase {
  getClient(clientName?: keyof IRedisClientRecord) {
    return this.app.bean._getBeanSelector(ServiceRedisClient, clientName);
  }

  get(clientName?: keyof IRedisClientRecord) {
    const client = this.getClient(clientName);
    return client.instance;
  }
}
