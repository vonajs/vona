import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtom: atomIdArchive -> atomIdFormal
    const sql = `
        ALTER TABLE aAtom
          CHANGE COLUMN atomIdArchive atomIdFormal int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
  }
}
