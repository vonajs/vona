import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aFlowTask
    await this.bean.model.alterTable('aFlowTask', function (table) {
      table.int1('allowViewWorkflow');
    });
    // aFlowTaskHistory
    await this.bean.model.alterTable('aFlowTaskHistory', function (table) {
      table.int1('allowViewWorkflow');
    });
    // aFlowNodeStartEventAtomCondition
    await this.bean.model.alterTable('aFlowNodeStartEventAtomCondition', function (table) {
      table.dropColumn('atomStage');
    });
  }
}
