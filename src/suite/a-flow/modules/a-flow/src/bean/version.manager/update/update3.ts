import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    let sql;
    // alter table: aFlowNode
    sql = `
      ALTER TABLE aFlowNode
        ADD COLUMN behaviorDefId varchar(255) DEFAULT '' 
                `;
    await this.ctx.model.query(sql);
    // alter table: aFlowNodeHistory
    sql = `
      ALTER TABLE aFlowNodeHistory
        ADD COLUMN behaviorDefId varchar(255) DEFAULT ''
                `;
    await this.ctx.model.query(sql);
  }
}
