import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'summer.cache' })
export class SummerCacheRoleScopesOfUser extends BeanBase {
  async get(key) {
    return await this.ctx.bean.atomRightAux.__getRoleScopesOfUserRaw(key);
  }
}
