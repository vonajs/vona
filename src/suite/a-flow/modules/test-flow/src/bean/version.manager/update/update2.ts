import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: testFlowProduct
    await this.bean.model.createTable('testFlowProduct', function (table) {
      table.basicFields();
      table.atomId();
      table.string('productCode', 50);
      table.int0('productPrice');
    });

    // create table: testFlowPurchaseOrderDetail
    await this.bean.model.createTable('testFlowPurchaseOrderDetail', function (table) {
      table.basicFields();
      table.atomId();
      table.int0('detailId');
      table.int0('price');
      table.int0('quantity');
      table.int0('amount');
    });

    // alter table: testFlowPurchaseOrder
    await this.bean.model.alterTable('testFlowPurchaseOrder', function (table) {
      table.int0('detailsCount');
      table.int0('detailsAmount');
    });
  }
}
