import { BeanBase } from '@cabloy/core';

import initData from './initData15.js';

export class VersionInit extends BeanBase {
  async run() {
    // roles
    await this._initRoles();
    // change roleIdOwner
    await this._changeRoleIdOwner();
  }

  // roles
  async _initRoles() {
    return await this.ctx.bean.role._initSystemRoles({
      module: ,
      rolesData: initData.roles,
    });
  }

  async _changeRoleIdOwner() {
    // change roleIdOwner from template.system to authenticated.builtIn for atomClass except role
    const roleSystem = await this.ctx.bean.role.getSystemRole({ roleName: 'system' });
    const roleBuiltIn = await this.ctx.bean.role.getSystemRole({ roleName: 'builtIn' });
    const atomClassRole = await this.ctx.bean.atomClass.get({ module: , atomClassName: 'role' });
    await this.ctx.model.query(
      `
          update aAtom set roleIdOwner=? where iid=? and atomClassId<>? and roleIdOwner=?
      `,
      [roleBuiltIn.id, this.ctx.instance.id, atomClassRole.id, roleSystem.id],
    );
  }
}
