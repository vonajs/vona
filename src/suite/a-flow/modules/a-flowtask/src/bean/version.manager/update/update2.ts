import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aFlowTask
    await this.bean.model.alterTable('aFlowTask', function (table) {
      table.int0('ignoreMark');
      table.int0('flowTaskIdForwardFrom');
      table.int0('flowTaskIdForwardTo');
      table.int0('flowTaskIdSubstituteFrom');
      table.int0('flowTaskIdSubstituteTo');
    });

    // aFlowTaskHistory
    await this.bean.model.alterTable('aFlowTaskHistory', function (table) {
      table.int0('ignoreMark');
      table.int0('flowTaskIdForwardFrom');
      table.int0('flowTaskIdForwardTo');
      table.int0('flowTaskIdSubstituteFrom');
      table.int0('flowTaskIdSubstituteTo');
    });
  }
}
