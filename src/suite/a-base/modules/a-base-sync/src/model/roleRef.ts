import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aRoleRef', options: { disableDeleted: true } })
export class ModelRoleRef extends BeanModelBase {
  async getParent({ roleId, level = 1 }) {
    const roleRef = await this.get({
      roleId,
      level,
    });
    return roleRef;
  }
}
