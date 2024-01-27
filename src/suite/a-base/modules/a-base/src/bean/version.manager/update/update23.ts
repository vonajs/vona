import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtomClass: drop atomClassIdParent
    const sql = `
        ALTER TABLE aAtomClass
          DROP COLUMN atomClassIdParent
                  `;
    await this.ctx.model.query(sql);
  }
}
