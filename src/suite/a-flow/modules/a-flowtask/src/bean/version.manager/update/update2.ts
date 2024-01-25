import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(options) {
    let sql;

    // aFlowTask
    sql = `
          ALTER TABLE aFlowTask
            ADD COLUMN ignoreMark int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdForwardFrom int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdForwardTo int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdSubstituteFrom int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdSubstituteTo int(11) DEFAULT '0'
                `;
    await this.ctx.model.query(sql);

    // aFlowTaskHistory
    sql = `
          ALTER TABLE aFlowTaskHistory
            ADD COLUMN ignoreMark int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdForwardFrom int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdForwardTo int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdSubstituteFrom int(11) DEFAULT '0',
            ADD COLUMN flowTaskIdSubstituteTo int(11) DEFAULT '0'
                `;
    await this.ctx.model.query(sql);
  }
}
