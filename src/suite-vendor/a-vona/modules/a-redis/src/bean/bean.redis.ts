import { Bean, BeanBase } from 'vona';
import { ServiceRedisClient } from '../service/redisClient.js';

@Bean()
export class BeanRedis extends BeanBase {
  getClient(clientName?: string) {
    return this.app.bean._getBeanSelector(ServiceRedisClient, clientName);
  }

  get(clientName?: string) {
    const client = this.getClient(clientName);
    return client.instance;
  }
}
