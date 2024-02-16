import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: testFlowPurchaseOrder
    const sql = `
    ALTER TABLE testFlowPurchaseOrder
      ADD COLUMN payMoneyAmount int(11) DEFAULT '0',
      ADD COLUMN payMoneyPerson int(11) DEFAULT '0',
      ADD COLUMN payMoneyTime timestamp DEFAULT NULL,
      ADD COLUMN receiveGoodsPics varchar(255) DEFAULT NULL,
      ADD COLUMN receiveGoodsPerson int(11) DEFAULT '0',
      ADD COLUMN receiveGoodsTime timestamp DEFAULT NULL
  `;
    await this.ctx.model.query(sql);
  }
}
