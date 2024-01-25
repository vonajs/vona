import { Update10 } from './update_10.js';

export class Update11 extends Update10 {
  async _update_11(options) {
    // alter table: aCmsArticle
    const sql = `
      ALTER TABLE aCmsArticle
        ADD COLUMN renderAt timestamp DEFAULT NULL
                `;
    await this.ctx.model.query(sql);
  }
}
