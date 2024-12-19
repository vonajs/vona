import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@Bean()
export class BeanCache extends BeanBase {
  get db() {
    // always return redis
    return this.redis;
    // const config = this.scope.config;
    // if (config.db.redis) {
    //   return this.redis;
    // }
    // return this._db;
  }

  get _db() {
    return this.bean.cacheDb;
  }

  get mem() {
    return this.bean.cacheMem;
  }

  get redis() {
    return this.bean.cacheRedis;
  }
}
