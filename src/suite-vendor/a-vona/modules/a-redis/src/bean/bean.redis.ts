import type { IRedisClientRecord } from '../types/redis.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceRedisClient } from '../service/redisClient.ts';

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
