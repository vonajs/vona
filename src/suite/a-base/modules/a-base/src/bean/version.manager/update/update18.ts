import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aUser
    await this.bean.model.alterTable('aUser', function (table) {
      table.int1('allowChangeUserName');
      table.timestamp('lastTimeChangeUserName');
    });
  }
}
