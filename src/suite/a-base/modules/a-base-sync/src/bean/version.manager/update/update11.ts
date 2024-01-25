import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtom: add atomSimple
    const sql = `
        ALTER TABLE aAtom
          ADD COLUMN atomSimple int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
  }
}
