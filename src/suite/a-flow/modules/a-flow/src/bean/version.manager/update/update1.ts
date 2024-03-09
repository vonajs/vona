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
    await this.bean.model.createTable('aFlowNodeHistory', function (table) {
      table.basicFields();
      table.int0('flowId');
      table.int0('flowNodeId');
      table.string('flowNodeDefId', 255);
      table.string('flowNodeName', 255);
      table.string('flowNodeType', 50);
      table.int0('flowNodeIdPrev');
      table.int0('flowNodeStatus');
      table.text('flowNodeRemark');
      table.timestamp('timeDone');
      table.json('nodeVars');
    });
  }
}
