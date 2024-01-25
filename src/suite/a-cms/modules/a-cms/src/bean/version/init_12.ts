import Init1 from './init_1.js';

export class Init12 extends Init1 {
  async _init_12(options) {
    // add role rights
    const roleRights = [
      { roleName: 'root', action: 'layout', scopeNames: 'root' }, //
      { roleName: 'root', action: 'preview', scopeNames: 'root' }, //
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'article', roleRights });
  }
}
