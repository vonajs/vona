import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    let roleRights: any[] = [
      //
      { roleName: 'system', action: 'read', scopeNames: 'authenticated' },
      // custom
      { roleName: 'system', action: 'kickOut', scopeNames: 'authenticated' },
    ];
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'userOnline', roleRights });
    //
    roleRights = [
      //
      { roleName: 'system', action: 'read' },
      { roleName: 'system', action: 'delete' },
      { roleName: 'system', action: 'deleteBulk' },
      // todo: only for test
      // { roleName: 'system', action: 'exportBulk' },
      // { roleName: 'system', action: 'create' },
      // { roleName: 'system', action: 'write' },
      // { roleName: 'system', action: 'clone' },
    ];
    await this.app.bean.role.addRoleRightBatch({
      module: __ThisModule__,
      atomClassName: 'userOnlineHistory',
      roleRights,
    });
  }
}
