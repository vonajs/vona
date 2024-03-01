import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // add userId 0
    await this.bean.model.builder('aUser').insert({
      id: 0,
      iid: 0,
      userName: 'system',
      realName: 'system',
    });
    // add roleId 0
    await this.bean.model.builder('aRole').insert({
      id: 0,
      iid: 0,
      roleName: 'system',
      catalog: 1,
      system: 1,
      roleIdParent: -1,
    });
  }
}
