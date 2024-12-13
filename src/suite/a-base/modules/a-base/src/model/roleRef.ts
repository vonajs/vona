import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleRef } from '../entity/roleRef.js';

@Model({ entity: EntityRoleRef, disableDeleted: true })
export class ModelRoleRef extends BeanModelBase<EntityRoleRef> {
  async getParent({ roleId, level = 1 }: any) {
    const roleRef = await this.get({
      roleId,
      level,
    });
    return roleRef;
  }
}
