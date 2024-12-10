import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    const roleRights = [
      // custom
      { roleName: 'system', action: 'loginLog', scopeNames: 'authenticated' },
    ];
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'userOnline', roleRights });
  }
}
