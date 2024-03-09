import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    let sql;
    // create table: aFlowDef
    await this.bean.model.createTable('aFlowDef', function (table) {
      table.basicFields();
      table.atomId();
      table.description();
    });

    // create table: aFlowDefContent
    await this.bean.model.createTable('aFlowDefContent', function (table) {
      table.basicFields();
      table.atomId();
      table.itemId();
      table.content();
    });

    // create view: aFlowDefViewFull
    await this.bean.model.createView('aFlowDefViewFull', view => {
      view.as(
        this.bean.model
          .builder('aFlowDef as a')
          .select(['a.*', 'b.content'])
          .leftJoin('aFlowDefContent as b', { 'a.id': 'b.itemId' }),
      );
    });

    // create table: aFlow
    //  flowStatus: 1/end
    await this.bean.model.createTable('aFlow', function (table) {
      table.basicFields();
      table.int0('flowDefId');
      table.string('flowDefKey', 255);
      table.int0('flowDefRevision');
      table.string('flowName', 255);
      table.int0('flowStatus');
      table.int0('flowAtomId');
      table.json('flowVars');
      table.int0('flowNodeIdCurrent');
      table.string('flowNodeNameCurrent', 255);
      table.int0('flowUserId');
      table.timestamp('timeEnd');
      table.string('flowRemark', 255);
    });

    // create table: aFlowNode
    await this.bean.model.createTable('aFlowNode', function (table) {
      table.basicFields();
      table.int0('flowId');
      table.string('flowNodeDefId', 255);
      table.string('flowNodeName', 255);
      table.string('flowNodeType', 50);
      table.int0('flowNodeIdPrev');
      table.json('nodeVars');
    });

    // create table: aFlowHistory
    //  flowStatus: 1/end
    await this.bean.model.createTable('aFlowHistory', function (table) {
      table.basicFields();
      table.int0('flowId');
      table.int0('flowDefId');
      table.string('flowDefKey', 255);
      table.int0('flowDefRevision');
      table.string('flowName', 255);
      table.int0('flowStatus');
      table.int0('flowAtomId');
      table.json('flowVars');
      table.int0('flowNodeIdCurrent');
      table.string('flowNodeNameCurrent', 255);
      table.int0('flowUserId');
      table.timestamp('timeEnd');
      table.string('flowRemark', 255);
    });

    // create table: aFlowNodeHistory
    sql = `
        CREATE TABLE aFlowNodeHistory (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          flowId int(11) DEFAULT '0',
          flowNodeId int(11) DEFAULT '0',
          flowNodeDefId varchar(255) DEFAULT NULL,
          flowNodeName varchar(255) DEFAULT NULL,
          flowNodeType varchar(50) DEFAULT NULL,
          flowNodeIdPrev int(11) DEFAULT '0',
          flowNodeStatus int(11) DEFAULT '0',
          flowNodeRemark TEXT DEFAULT NULL,
          timeDone timestamp DEFAULT NULL,
          nodeVars JSON DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
  }
}
