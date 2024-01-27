import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsArticle
    const sql = `
    ALTER TABLE aCmsArticle
      ADD COLUMN imageCover varchar(255) DEFAULT NULL
              `;
    await this.ctx.model.query(sql);
  }
}
