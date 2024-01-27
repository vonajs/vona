import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // drop column: aCmsContent.itemId
    const sql = `
    ALTER TABLE aCmsContent
      DROP COLUMN itemId
  `;
    await this.ctx.db.query(sql);
    // drop view: aCmsArticleViewFull
    await this.ctx.model.query('drop view aCmsArticleViewFull');
    // drop view: aCmsArticleViewSearch
    await this.ctx.model.query('drop view aCmsArticleViewSearch');
  }
}
