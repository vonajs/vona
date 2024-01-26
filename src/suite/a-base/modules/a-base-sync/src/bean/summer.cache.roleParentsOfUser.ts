import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'summer.cache' })
export class SummerCacheRoleParentsOfUser extends BeanBase {
  async get(key) {
    return await this.ctx.bean.atomRightAux.__getRoleParentsOfUserRaw(key);
  }
}
