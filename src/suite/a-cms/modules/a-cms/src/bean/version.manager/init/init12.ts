import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    const roleRights = [
      { roleName: 'root', action: 'layout', scopeNames: 'root' }, //
      { roleName: 'root', action: 'preview', scopeNames: 'root' }, //
    ];
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'article', roleRights });
  }
}
