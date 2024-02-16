import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: testFlowProduct
    let sql = `
    CREATE TABLE testFlowProduct (
      id int(11) NOT NULL AUTO_INCREMENT,
      createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted int(11) DEFAULT '0',
      iid int(11) DEFAULT '0',
      atomId int(11) DEFAULT '0',
      productCode varchar(50) DEFAULT NULL,
      productPrice int(11) DEFAULT '0',
      PRIMARY KEY (id)
    )
  `;
    await this.ctx.model.query(sql);
    // create table: testFlowPurchaseOrderDetail
    sql = `
    CREATE TABLE testFlowPurchaseOrderDetail (
      id int(11) NOT NULL AUTO_INCREMENT,
      createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted int(11) DEFAULT '0',
      iid int(11) DEFAULT '0',
      atomId int(11) DEFAULT '0',
      detailId int(11) DEFAULT '0',
      price int(11) DEFAULT '0',
      quantity int(11) DEFAULT '0',
      amount int(11) DEFAULT '0',
      PRIMARY KEY (id)
    )
  `;
    await this.ctx.model.query(sql);
    // alter table: testFlowPurchaseOrder
    sql = `
    ALTER TABLE testFlowPurchaseOrder
      ADD COLUMN detailsCount int(11) DEFAULT '0',
      ADD COLUMN detailsAmount int(11) DEFAULT '0'
  `;
    await this.ctx.model.query(sql);
  }
}
