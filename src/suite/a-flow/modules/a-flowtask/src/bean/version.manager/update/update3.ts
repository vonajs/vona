import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aFlowNodeStartEventAtomCondition
    await this.bean.model.alterTable('aFlowNodeStartEventAtomCondition', function (table) {
      table.int0('atomStage');
    });
  }
}
