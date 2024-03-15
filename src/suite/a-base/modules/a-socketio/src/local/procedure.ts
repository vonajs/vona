import { Local, BeanBase } from '@cabloy/core';

@Local()
export class LocalProcedure extends BeanBase {
  async selectMessages({ where, orders, page, offset, count }: any) {
    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // syncDeleted
    _where['a.syncDeleted'] = 0;
    // offset
    if (typeof offset === 'number') {
      _where['a.id'] = { op: '>', val: offset };
    }

    // builder
    const builder = this.bean.model.builderSelect('aSocketIOMessageView as a');
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = ['a.*'];
      builder.select(_selectFields);
    }
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
    const debug = this.app.bean.debug.get('io:sql');
    if (debug.enabled) {
      debug('===== selectMessages =====\n%s', builder.toQuery());
    }
    return await builder;
  }

  setRead({ iid, messageClassId, messageIds, all, userId }: any) {
    if (messageIds && messageIds.length > 0) {
      const _messageIds = messageIds.map(item => parseInt(item)).join(',');

      // sql
      const _sql = `update aSocketIOMessageSync set messageRead=1
          where iid=${iid} and userId=${userId} and messageId in (${_messageIds})
        `;

      // ok
      return _sql;
    } else if (messageClassId > 0 && all) {
      // sql
      const _sql = `update aSocketIOMessageSync set messageRead=1
          where iid=${iid} and userId=${userId} and messageClassId=${messageClassId}
        `;

      // ok
      return _sql;
    }
    return null;
  }

  delete({ iid, messageIds, userId }: any) {
    const _messageIds = messageIds.map(item => parseInt(item)).join(',');

    // sql
    const _sql = `update aSocketIOMessageSync set deleted=1
          where iid=${iid} and userId=${userId} and messageId in (${_messageIds})
        `;

    // ok
    return _sql;
  }
}
