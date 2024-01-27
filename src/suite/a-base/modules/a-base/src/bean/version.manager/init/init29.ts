import { BeanBase } from '@cabloy/core';

export class VersionInit extends BeanBase {
  async run() {
    await this._addRoleRightsRole();
    await this._addRoleRightsUser();
  }

  async _addRoleRightsRole() {
    // add role rights
    const roleRights = [
      //
      { roleName: 'system', action: 'fieldsAuthorizations', scopeNames: 'root' },
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'role', roleRights });
  }

  async _addRoleRightsUser() {
    // add role rights
    const roleRights = [
      //
      { roleName: 'system', action: 'fieldsAuthorizations', scopeNames: 'root' },
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'user', roleRights });
  }
}
