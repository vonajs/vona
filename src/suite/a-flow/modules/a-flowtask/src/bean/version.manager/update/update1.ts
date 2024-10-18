import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: aFlowNodeStartEventAtomCondition
    await this.bean.model.createTable('aFlowNodeStartEventAtomCondition', function (table) {
      table.basicFields();
      table.int0('flowDefId');
      table.string('startEventId', 255);
      table.int0('atomClassId');
      table.text('conditionExpression');
    });

    // create table: aFlowTask
    await this.bean.model.createTable('aFlowTask', function (table) {
      table.basicFields();
      table.int0('flowId');
      table.int0('flowNodeId');
      table.int0('flowTaskStatus');
      table.int0('flowTaskHidden');
      table.int0('userIdAssignee');
      table.int0('specificFlag');
      table.int0('handleStatus');
      table.text('handleRemark');
      table.timestamp('timeClaimed');
      table.timestamp('timeHandled');
      table.json('taskVars');
    });

    // create table: aFlowTaskHistory
    await this.bean.model.createTable('aFlowTaskHistory', function (table) {
      table.basicFields();
      table.int0('flowId');
      table.int0('flowTaskId');
      table.int0('flowNodeId');
      table.int0('flowTaskStatus');
      table.int0('flowTaskHidden');
      table.int0('userIdAssignee');
      table.int0('specificFlag');
      table.int0('handleStatus');
      table.text('handleRemark');
      table.timestamp('timeClaimed');
      table.timestamp('timeHandled');
      table.json('taskVars');
    });
  }
}
