import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aUser
    await this.bean.model.alterTable('aUser', function (table) {
      table.int1('allowChangeUserName');
      table.timestamp('lastTimeChangeUserName');
    });
  }
}
