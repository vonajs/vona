import { BeanBase } from 'vona';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role rights
    const roleRights = [
      { roleName: 'root', action: 'layout', scopeNames: 'root' }, //
      { roleName: 'root', action: 'preview', scopeNames: 'root' }, //
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'article', roleRights });
  }
}
