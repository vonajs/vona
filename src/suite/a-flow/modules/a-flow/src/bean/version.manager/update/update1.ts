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
    sql = `
        CREATE TABLE aFlow (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          flowDefId int(11) DEFAULT '0',
          flowDefKey varchar(255) DEFAULT NULL,
          flowDefRevision int(11) DEFAULT '0',
          flowName varchar(255) DEFAULT NULL,
          flowStatus int(11) DEFAULT '0',
          flowAtomId int(11) DEFAULT '0',
          flowVars JSON DEFAULT NULL,
          flowNodeIdCurrent int(11) DEFAULT '0',
          flowNodeNameCurrent varchar(255) DEFAULT NULL,
          flowUserId int(11) DEFAULT '0',
          timeEnd timestamp DEFAULT NULL,
          flowRemark varchar(255) DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
    // create table: aFlowNode
    sql = `
        CREATE TABLE aFlowNode (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          flowId int(11) DEFAULT '0',
          flowNodeDefId varchar(255) DEFAULT NULL,
          flowNodeName varchar(255) DEFAULT NULL,
          flowNodeType varchar(50) DEFAULT NULL,
          flowNodeIdPrev int(11) DEFAULT '0',
          nodeVars JSON DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
    // create table: aFlowHistory
    //  flowStatus: 1/end
    sql = `
        CREATE TABLE aFlowHistory (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          flowId int(11) DEFAULT '0',
          flowDefId int(11) DEFAULT '0',
          flowDefKey varchar(255) DEFAULT NULL,
          flowDefRevision int(11) DEFAULT '0',
          flowName varchar(255) DEFAULT NULL,
          flowStatus int(11) DEFAULT '0',
          flowAtomId int(11) DEFAULT '0',
          flowVars JSON DEFAULT NULL,
          flowNodeIdCurrent int(11) DEFAULT '0',
          flowNodeNameCurrent varchar(255) DEFAULT NULL,
          flowUserId int(11) DEFAULT '0',
          timeEnd timestamp DEFAULT NULL,
          flowRemark varchar(255) DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
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
