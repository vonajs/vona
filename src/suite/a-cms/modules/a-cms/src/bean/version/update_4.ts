import { Update3 } from './update_3.js';

export class Update4 extends Update3 {
  async _update_4(_options) {
    // alter table: aCmsCategory
    const sql = `
    ALTER TABLE aCmsCategory
      ADD COLUMN url varchar(255) DEFAULT NULL
              `;
    await this.ctx.model.query(sql);
  }
}
