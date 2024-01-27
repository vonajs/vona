import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtomClass: drop atomClassInner
    const sql = `
        ALTER TABLE aAtomClass
          DROP COLUMN atomClassInner
                  `;
    await this.ctx.model.query(sql);
  }
}
