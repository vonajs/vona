import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsCategory
    const sql = `
    ALTER TABLE aCmsCategory
      ADD COLUMN url varchar(255) DEFAULT NULL
              `;
    await this.ctx.model.query(sql);
  }
}
