import { BeanBase } from 'vona';
import { ServiceRedisClient } from '../service/redisClient.js';
import { Bean } from 'vona-module-a-bean';

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
