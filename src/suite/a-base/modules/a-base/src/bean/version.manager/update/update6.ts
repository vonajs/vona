import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aUser
    const sql = `
        ALTER TABLE aUser
          ADD COLUMN activated int(11) DEFAULT '0',
          ADD COLUMN emailConfirmed int(11) DEFAULT '0',
          ADD COLUMN mobileVerified int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
  }
}
