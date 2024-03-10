import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: testFlowPurchaseOrder
    await this.bean.model.createTable('testFlowPurchaseOrder', function (table) {
      table.basicFields();
      table.atomId();
      table.description();
      table.string('_flowDefKey', 255);
    });
  }
}
