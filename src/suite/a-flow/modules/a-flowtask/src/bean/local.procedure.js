module.exports = class Procedure {
  selectTasks({ iid, userIdWho, where, orders, page, count, history }) {
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    history = parseInt(history);

    // history
    if (history === 0) {
      return this._selectTasks_0({ iid, userIdWho, where, orders, page, count });
    }
    return this._selectTasks_1({ iid, userIdWho, where, orders, page, count });
  }

  _selectTasks_0({ iid, userIdWho, where, orders, page, count }) {
    // -- tables
    // -- a: aFlowTask
    // -- b: aFlowNode
    // -- c: aFlow
    // -- d: aUser
    // -- e: aUser(for flowUserId)

    // for safe
    where = where ? this.ctx.model._where(where) : null;
    orders = orders ? this.ctx.model._orders(orders) : null;
    const limit = page ? this.ctx.model._limit(page.size, page.index) : null;

    // vars
    let _userWhere;

    //
    const _where = where ? `${where} AND` : ' WHERE';
    const _orders = orders || '';
    const _limit = limit || '';

    // user
    if (userIdWho !== 0) {
      _userWhere = ` and a.userIdAssignee=${userIdWho}`;
    } else {
      _userWhere = '';
    }

    // fields
    let _selectFields;
    if (count) {
      _selectFields = 'count(*) as _count';
    } else {
      _selectFields = `a.*,a.id as flowTaskId,
            b.flowNodeDefId,b.flowNodeName,b.flowNodeType,0 as flowNodeStatus,
            c.flowDefId,c.flowDefKey,c.flowDefRevision,c.flowName,c.flowStatus,c.flowAtomId,c.flowAtomClassId,c.flowNodeIdCurrent,c.flowUserId,
            d.userName,d.avatar,
            e.userName as flowUserName,e.avatar as flowUserAvatar
          `;
    }

    // sql
    const _sql = `select ${_selectFields} from aFlowTask a
            inner join aFlowNode b on a.flowNodeId=b.id
            inner join aFlow c on a.flowId=c.id
            left join aUser d on a.userIdAssignee=d.id
            left join aUser e on c.flowUserId=e.id

          ${_where}
           (
             a.deleted=0 and a.iid=${iid}
             ${_userWhere}
           )

          ${count ? '' : _orders}
          ${count ? '' : _limit}
        `;

    // ok
    return _sql;
  }

  _selectTasks_1({ iid, userIdWho, where, orders, page, count }) {
    // -- tables
    // -- a: aFlowTaskHistory
    // -- b: aFlowNodeHistory
    // -- c: aFlowHistory
    // -- d: aUser
    // -- e: aUser(for flowUserId)

    // for safe
    where = where ? this.ctx.model._where(where) : null;
    orders = orders ? this.ctx.model._orders(orders) : null;
    const limit = page ? this.ctx.model._limit(page.size, page.index) : null;

    // vars
    let _userWhere;

    //
    const _where = where ? `${where} AND` : ' WHERE';
    const _orders = orders || '';
    const _limit = limit || '';

    // user
    if (userIdWho !== 0) {
      _userWhere = ` and a.userIdAssignee=${userIdWho}`;
    } else {
      _userWhere = '';
    }

    // fields
    let _selectFields;
    if (count) {
      _selectFields = 'count(*) as _count';
    } else {
      _selectFields = `a.*,
            b.flowNodeDefId,b.flowNodeName,b.flowNodeType,b.flowNodeStatus,b.flowNodeHandleStatus,b.flowNodeRemark,b.timeDone,
            c.flowDefId,c.flowDefKey,c.flowDefRevision,c.flowName,c.flowStatus,c.flowAtomId,c.flowAtomClassId,c.flowNodeIdCurrent,c.flowUserId,
            d.userName,d.avatar,
            e.userName as flowUserName,e.avatar as flowUserAvatar
          `;
    }

    // sql
    const _sql = `select ${_selectFields} from aFlowTaskHistory a
            inner join aFlowNodeHistory b on a.flowNodeId=b.flowNodeId
            inner join aFlowHistory c on a.flowId=c.flowId
            left join aUser d on a.userIdAssignee=d.id
            left join aUser e on c.flowUserId=e.id

          ${_where}
           (
             a.deleted=0 and a.iid=${iid}
             ${_userWhere}
           )

          ${count ? '' : _orders}
          ${count ? '' : _limit}
        `;

    // ok
    return _sql;
  }
};
