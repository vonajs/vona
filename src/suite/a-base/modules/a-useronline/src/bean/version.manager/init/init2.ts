import { BeanBase } from 'vona';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    const roleRights = [
      // custom
      { roleName: 'system', action: 'loginLog', scopeNames: 'authenticated' },
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'userOnline', roleRights });
  }
}
