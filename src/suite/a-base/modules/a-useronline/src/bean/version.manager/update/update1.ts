import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: aUserOnline
    await this.bean.model.createTable('aUserOnline', function (table) {
      table.basicFields();
      table.atomId();
      table.userId();
      table.int0('loginCount');
      table.string('loginIPLast', 50);
      table.timestamp('loginTimeLast');
      table.int0('onlineCount');
      table.string('onlineIPLast', 50);
      table.timestamp('onlineTimeLast');
      table.timestamp('expireTime');
    });

    // create table: aUserOnlineHistory
    await this.bean.model.createTable('aUserOnlineHistory', function (table) {
      table.basicFields();
      table.atomId();
      table.userId();
      table.string('onlineIP', 50);
      table.timestamp('onlineTime');
      table.int0('isLogin');
    });
  }
}
