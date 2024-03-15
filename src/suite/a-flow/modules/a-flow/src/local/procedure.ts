import { Local, BeanBase } from '@cabloy/core';
import { Knex } from 'cabloy-module-api-a-database';

@Local()
export class LocalProcedure extends BeanBase {
  // mode: mine/others/flowing/history
  async selectFlows({ iid, userIdWho, where, orders, page, count, mode }: any) {
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);

    // mode
    if (mode === 'mine') {
      return await this._selectFlows_Mine({ iid, userIdWho, where, orders, page, count });
    } else if (mode === 'others' || mode === 'flowing') {
      return await this._selectFlows_Others({ iid, userIdWho, where, orders, page, count, mode });
    }
    return await this._selectFlows_History({ iid, userIdWho, where, orders, page, count });
  }

  async _selectFlows_Mine({ iid, userIdWho, where, orders, page, count }: any) {
    // -- tables
    // -- a: aFlow
    // -- c: aUser

    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // user
    if (userIdWho !== 0) {
      _where['a.flowUserId'] = userIdWho;
    }

    // builder
    const builder = this.bean.model.builderSelect('aFlow as a');
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = [
        'a.id',
        'a.id as flowId',
        'a.createdAt',
        'a.updatedAt',
        'a.deleted',
        'a.iid',
        'a.flowName',
        'a.flowStatus',
        'a.flowAtomId',
        'a.flowAtomClassId',
        'a.flowNodeIdCurrent',
        'a.flowNodeNameCurrent',
        'a.flowUserId',
        'c.userName',
        'c.avatar',
      ];
      builder.select(_selectFields);
    }
    // joins
    builder.leftJoin('aUser as c', { 'a.flowUserId': 'c.id' });
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
      debug('===== selectFlows =====\n%s', builder.toQuery());
    }
    return await builder;
  }

  async _selectFlows_Others({ iid, userIdWho, where, orders, page, count, mode }: any) {
    // -- tables
    // -- a: aFlow
    // -- c: aUser
    // -- d: aFlowTaskHistory

    const self = this;

    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // vars
    let _userWhere;
    let _modeWhere;

    // user
    if (userIdWho !== 0) {
      _where.__exists__user = function (this: Knex.QueryBuilder) {
        return this.select(['d.id'])
          .from('aFlowTaskHistory as d')
          .where({
            'd.deleted': 0,
            'd.flowId': self.bean.model.ref('a.id'),
            'd.userIdAssignee': userIdWho,
          });
      };
    }

    // mode
    if (mode === 'others') {
      _where['a.flowUserId'] = { op: '<>', val: userIdWho };
    }

    // builder
    const builder = this.bean.model.builderSelect('aFlow as a');
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = [
        'a.id',
        'a.id as flowId',
        'a.createdAt',
        'a.updatedAt',
        'a.deleted',
        'a.iid',
        'a.flowName',
        'a.flowStatus',
        'a.flowAtomId',
        'a.flowAtomClassId',
        'a.flowNodeIdCurrent',
        'a.flowNodeNameCurrent',
        'a.flowUserId',
        'c.userName',
        'c.avatar',
      ];
      builder.select(_selectFields);
    }
    // joins
    builder.leftJoin('aUser as c', { 'a.flowUserId': 'c.id' });
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
      debug('===== selectFlows =====\n%s', builder.toQuery());
    }
    return await builder;
  }

  _selectFlows_History({ iid, userIdWho, where, orders, page, count }: any) {
    // -- tables
    // -- a: aFlowHistory
    // -- c: aUser
    // -- d: aFlowTaskHistory

    // for safe
    where = where ? this.bean.model._where(where) : null;
    orders = orders ? this.bean.model._orders(orders) : null;
    const limit = page ? this.bean.model._limit(page.size, page.index) : null;

    // vars
    let _userWhere;

    //
    const _where = where ? `${where} AND` : ' WHERE';
    const _orders = orders || '';
    const _limit = limit || '';

    // user
    if (userIdWho !== 0) {
      _userWhere = ` and exists(select d.id from aFlowTaskHistory d where d.deleted=0 and d.flowId=a.flowId and d.userIdAssignee=${userIdWho})`;
    } else {
      _userWhere = '';
    }

    // fields
    let _selectFields;
    if (count) {
      _selectFields = 'count(*) as _count';
    } else {
      _selectFields = `a.id,a.flowId,a.createdAt,a.updatedAt,a.deleted,a.iid,a.flowName,a.flowStatus,a.flowAtomId,a.flowAtomClassId,a.flowNodeIdCurrent,a.flowNodeNameCurrent,a.flowUserId,a.timeEnd,a.flowHandleStatus,a.flowRemark,
            c.userName,c.avatar
          `;
    }

    // sql
    const _sql = `select ${_selectFields} from aFlowHistory a
            left join aUser c on a.flowUserId=c.id

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
}
