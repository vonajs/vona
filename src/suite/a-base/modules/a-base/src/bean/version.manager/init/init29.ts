import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

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
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'role', roleRights });
  }

  async _addRoleRightsUser() {
    // add role rights
    const roleRights = [
      //
      { roleName: 'system', action: 'fieldsAuthorizations', scopeNames: 'root' },
    ];
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'user', roleRights });
  }
}
