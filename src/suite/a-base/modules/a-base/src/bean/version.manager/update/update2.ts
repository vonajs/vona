import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // enable 0
    await this.ctx.model.query("SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO'");
    // add userId 0
    await this.ctx.model.insert('aUser', {
      id: 0,
      iid: 0,
      userName: 'system',
      realName: 'system',
    });
    // add roleId 0
    await this.ctx.model.insert('aRole', {
      id: 0,
      iid: 0,
      roleName: 'system',
      catalog: 1,
      system: 1,
      roleIdParent: -1,
    });
    // disable 0
    await this.ctx.model.query("SET SESSION sql_mode=''");
  }
}
