import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

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
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'product', roleRights });
  }
}
