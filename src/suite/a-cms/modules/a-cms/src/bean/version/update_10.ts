import Update9 from './update_9.js';

export class Update10 extends Update9 {
  async _update_10(options) {
    // alter table: aCmsArticle
    const sql = `
      ALTER TABLE aCmsArticle
        ADD COLUMN imageCover varchar(255) DEFAULT NULL
                `;
    await this.ctx.model.query(sql);
  }
}
