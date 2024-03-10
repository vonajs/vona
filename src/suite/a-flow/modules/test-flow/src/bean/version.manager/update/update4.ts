import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: testFlowPurchaseOrderDetail
    await this.bean.model.alterTable('testFlowPurchaseOrderDetail', function (table) {
      table.int0('detailCodeId');
      table.string('detailCode', 255);
      table.string('detailName', 255);
      table.int0('detailLineNo');
      table.renameColumn('atomId', 'atomIdMain');
      table.dropColumn('detailId');
    });
  }
}
