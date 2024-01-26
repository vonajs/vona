import { Bean, BeanBase } from '@cabloy/core';

@Bean()
export class BeanCache extends BeanBase {
  get db() {
    const config = this.ctx.config.module(moduleInfo.relativeName);
    if (config.db.redis) {
      return this.redis;
    }
    return this._db;
  }

  get _db() {
    return this.ctx.bean._getBean('a-cache.local.db');
  }

  get mem() {
    return this.ctx.bean._getBean('a-cache.local.mem');
  }

  get redis() {
    return this.ctx.bean._getBean('a-cache.local.redis');
  }
}
