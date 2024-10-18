import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityRoleRef } from '../entity/roleRef.js';

@Model({ table: 'aRoleRef', options: { disableDeleted: true } })
export class ModelRoleRef extends BeanModelBase<EntityRoleRef> {
  async getParent({ roleId, level = 1 }: any) {
    const roleRef = await this.get({
      roleId,
      level,
    });
    return roleRef;
  }
}
