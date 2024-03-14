import { Local, BeanBase } from '@cabloy/core';

@Local()
export class LocalProcedure extends BeanBase {
  async selectTasks({ userIdWho, where, orders, page, count, history }: any) {
    userIdWho = parseInt(userIdWho);
    history = parseInt(history);

    // history
    if (history === 0) {
      return await this._selectTasks_0({ userIdWho, where, orders, page, count });
    }
    return await this._selectTasks_1({ userIdWho, where, orders, page, count });
  }

  async _selectTasks_0({ userIdWho, where, orders, page, count }: any) {
    // -- tables
    // -- a: aFlowTask
    // -- b: aFlowNode
    // -- c: aFlow
    // -- d: aUser
    // -- e: aUser(for flowUserId)

    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // user
    if (userIdWho !== 0) {
      _where['a.userIdAssignee'] = userIdWho;
    }

    // builder
    const builder = this.bean.model.builderSelect('aFlowTask as a');
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = [
        'a.*',
        'a.id as flowTaskId',
        'b.flowNodeDefId',
        'b.flowNodeName',
        'b.flowNodeType',
        this.bean.model.raw('? as flowNodeStatus', 0),
        'c.flowDefId',
        'c.flowDefKey',
        'c.flowDefRevision',
        'c.flowName',
        'c.flowStatus',
        'c.flowAtomId',
        'c.flowAtomClassId',
        'c.flowNodeIdCurrent',
        'c.flowUserId',
        'd.userName',
        'd.avatar',
        'e.userName as flowUserName',
        'e.avatar as flowUserAvatar',
      ];
      builder.select(_selectFields);
    }
    // joins
    builder
      .innerJoin('aFlowNode as b', { 'a.flowNodeId': 'b.id' })
      .innerJoin('aFlow as c', { 'a.flowId': 'c.id' })
      .leftJoin('aUser as d', { 'a.userIdAssignee': 'd.id' })
      .leftJoin('aUser as e', { 'c.flowUserId': 'e.id' });
    // where
    const wheres = this.bean.model.checkWhere(_where);
    if (wheres === false) return [];
    if (wheres !== true) {
      this.bean.model.buildWhere(builder, wheres);
    }
    // orders/page
    if (!count) {
      this.bean.model.buildOrders(builder, _orders);
      this.bean.model.buildPage(builder, page);
    }
    // execute
    const debug = this.app.bean.debug.get('flow:sql');
    if (debug.enabled) {
      debug('===== selectTasks =====\n%s', builder.toQuery());
    }
    return await builder;
  }

  async _selectTasks_1({ userIdWho, where, orders, page, count }: any) {
    // -- tables
    // -- a: aFlowTaskHistory
    // -- b: aFlowNodeHistory
    // -- c: aFlowHistory
    // -- d: aUser
    // -- e: aUser(for flowUserId)

    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // user
    if (userIdWho !== 0) {
      _where['a.userIdAssignee'] = userIdWho;
    }

    // builder
    const builder = this.bean.model.builderSelect('aFlowTaskHistory as a');
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = [
        'a.*',
        'b.flowNodeDefId',
        'b.flowNodeName',
        'b.flowNodeType',
        'b.flowNodeStatus',
        'b.flowNodeHandleStatus',
        'b.flowNodeRemark',
        'b.timeDone',
        'c.flowDefId',
        'c.flowDefKey',
        'c.flowDefRevision',
        'c.flowName',
        'c.flowStatus',
        'c.flowAtomId',
        'c.flowAtomClassId',
        'c.flowNodeIdCurrent',
        'c.flowUserId',
        'd.userName',
        'd.avatar',
        'e.userName as flowUserName',
        'e.avatar as flowUserAvatar',
      ];
      builder.select(_selectFields);
    }
    // joins
    builder
      .innerJoin('aFlowNodeHistory as b', { 'a.flowNodeId': 'b.flowNodeId' })
      .innerJoin('aFlowHistory as c', { 'a.flowId': 'c.flowId' })
      .leftJoin('aUser as d', { 'a.userIdAssignee': 'd.id' })
      .leftJoin('aUser as e', { 'c.flowUserId': 'e.id' });
    // where
    const wheres = this.bean.model.checkWhere(_where);
    if (wheres === false) return [];
    if (wheres !== true) {
      this.bean.model.buildWhere(builder, wheres);
    }
    // orders/page
    if (!count) {
      this.bean.model.buildOrders(builder, _orders);
      this.bean.model.buildPage(builder, page);
    }
    // execute
    const debug = this.app.bean.debug.get('flow:sql');
    if (debug.enabled) {
      debug('===== selectTasks =====\n%s', builder.toQuery());
    }
    return await builder;
  }
}
