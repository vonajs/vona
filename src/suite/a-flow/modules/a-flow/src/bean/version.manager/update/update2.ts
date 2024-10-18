import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: aFlow
    await this.bean.model.alterTable('aFlow', function (table) {
      table.int0('flowHandleStatus');
    });

    // alter table: aFlowHistory
    await this.bean.model.alterTable('aFlowHistory', function (table) {
      table.int0('flowHandleStatus');
    });

    // alter table: aFlowNode
    await this.bean.model.alterTable('aFlowNode', function (table) {
      table.int0('flowNodeHandleStatus');
    });

    // alter table: aFlowNodeHistory
    await this.bean.model.alterTable('aFlowNodeHistory', function (table) {
      table.int0('flowNodeHandleStatus');
    });
  }
}
