import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: testFlowPurchaseOrder
    await this.bean.model.alterTable('testFlowPurchaseOrder', function (table) {
      table.int0('payMoneyAmount');
      table.int0('payMoneyPerson');
      table.timestamp('payMoneyTime');
      table.string('receiveGoodsPics', 255);
      table.int0('receiveGoodsPerson');
      table.timestamp('receiveGoodsTime');
    });
  }
}
