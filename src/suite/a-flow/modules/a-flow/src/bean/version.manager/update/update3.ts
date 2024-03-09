import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: aFlowNode
    await this.bean.model.alterTable('aFlowNode', function (table) {
      table.string('behaviorDefId', 255).defaultTo('');
    });

    // alter table: aFlowNodeHistory
    await this.bean.model.alterTable('aFlowNodeHistory', function (table) {
      table.string('behaviorDefId', 255).defaultTo('');
    });
  }
}
