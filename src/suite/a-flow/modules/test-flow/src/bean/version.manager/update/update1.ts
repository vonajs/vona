import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: testFlowPurchaseOrder
    const sql = `
    CREATE TABLE testFlowPurchaseOrder (
      id int(11) NOT NULL AUTO_INCREMENT,
      createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted int(11) DEFAULT '0',
      iid int(11) DEFAULT '0',
      atomId int(11) DEFAULT '0',
      description varchar(255) DEFAULT NULL,
      _flowDefKey varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    )
  `;
    await this.ctx.model.query(sql);
  }
}
