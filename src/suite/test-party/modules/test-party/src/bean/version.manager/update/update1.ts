import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    await this.bean.model.createTable('testParty', function (table) {
      table.basicFields();
      table.atomId();
      table.int0('personCount');
      table.int0('partyTypeCode');
    });
  }
}
