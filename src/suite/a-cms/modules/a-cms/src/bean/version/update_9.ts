import { Update8 } from './update_8.js';

export class Update9 extends Update8 {
  async _update_9(_options) {
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
