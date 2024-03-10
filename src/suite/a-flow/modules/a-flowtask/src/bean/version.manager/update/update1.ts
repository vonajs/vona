import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    let sql;
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
    sql = `
        CREATE TABLE aFlowTaskHistory (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          flowId int(11) DEFAULT '0',
          flowTaskId int(11) DEFAULT '0',
          flowNodeId int(11) DEFAULT '0',
          flowTaskStatus int(11) DEFAULT '0',
          flowTaskHidden int(11) DEFAULT '0',
          userIdAssignee int(11) DEFAULT '0',
          specificFlag int(11) DEFAULT '0',
          handleStatus int(11) DEFAULT '0',
          handleRemark TEXT DEFAULT NULL,
          timeClaimed timestamp DEFAULT NULL,
          timeHandled timestamp DEFAULT NULL,
          taskVars JSON DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
  }
}
