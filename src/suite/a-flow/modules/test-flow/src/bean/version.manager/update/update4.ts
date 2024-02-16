import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: testFlowPurchaseOrderDetail
    const sql = `
    ALTER TABLE testFlowPurchaseOrderDetail
      ADD COLUMN detailCodeId int(11) DEFAULT '0',
      ADD COLUMN detailCode varchar(255) DEFAULT NULL,
      ADD COLUMN detailName varchar(255) DEFAULT NULL,
      ADD COLUMN detailLineNo int(11) DEFAULT '0',
      CHANGE COLUMN atomId atomIdMain int(11) DEFAULT '0',
      DROP COLUMN detailId
  `;
    await this.ctx.model.query(sql);
  }
}
