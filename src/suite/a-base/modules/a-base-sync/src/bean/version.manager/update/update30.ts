import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtomActin: code:16 name: workflowFormal -> viewWorkflow
    const sql = `
        update aAtomAction set name='viewWorkflow' where code=16
      `;
    await this.ctx.model.query(sql);
  }
}
