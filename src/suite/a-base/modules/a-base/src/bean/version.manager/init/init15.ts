import { __ThisModule__ } from '../../../resource/this.js';
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
      module: __ThisModule__,
      rolesData: initData.roles,
    });
  }

  async _changeRoleIdOwner() {
    // change roleIdOwner from template.system to authenticated.builtIn for atomClass except role
    const roleSystem = await this.ctx.bean.role.getSystemRole({ roleName: 'system' });
    const roleBuiltIn = await this.ctx.bean.role.getSystemRole({ roleName: 'builtIn' });
    const atomClassRole = await this.ctx.bean.atomClass.get({ module: __ThisModule__, atomClassName: 'role' });
    await this.bean.atom.model.update(
      { roleIdOwner: roleBuiltIn!.id },
      {
        where: {
          atomClassId: { op: '<>', val: atomClassRole.id },
          roleIdOwner: roleSystem!.id,
        },
        disableDeleted: true,
      },
    );
  }
}
