import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aAtom: drop atomId
    const sql = `
      ALTER TABLE aUserOnlineHistory
        DROP COLUMN atomId
    `;
    await this.ctx.model.query(sql);
  }
}
