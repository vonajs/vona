import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aStatus
    const sql = `
        delete from aStatus where name like 'user-layoutConfig:%'
      `;
    await this.ctx.model.query(sql);
  }
}
