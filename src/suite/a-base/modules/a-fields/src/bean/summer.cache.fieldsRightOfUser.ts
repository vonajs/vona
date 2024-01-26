import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'summer.cache' })
export class SummerCacheFieldsRightOfUser extends BeanBase {
  async get(key) {
    return await this.ctx.bean.fields.__getFieldsRightOfUserRaw(key);
  }
}
