import { BeanBase } from 'vona';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    const roleRights = [
      { roleName: 'authenticated', action: 'create' },
      { roleName: 'authenticated', action: 'read', scopeNames: 0 },
      { roleName: 'authenticated', action: 'write', scopeNames: 0 },
      { roleName: 'authenticated', action: 'delete', scopeNames: 0 },
      { roleName: 'authenticated', action: 'clone', scopeNames: 0 },
      { roleName: 'authenticated', action: 'deleteBulk' },
      { roleName: 'authenticated', action: 'exportBulk' },
      { roleName: 'system', action: 'read', scopeNames: 'authenticated' },
    ];
    await this.app.bean.role.addRoleRightBatch({ atomClassName: 'purchaseOrder', roleRights });
  }
}
