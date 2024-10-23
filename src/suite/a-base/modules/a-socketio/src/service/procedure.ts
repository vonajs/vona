import { Service, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Service()
export class ServiceProcedure extends BeanBase<ScopeModule> {
  get modelMessageSync() {
    return this.scope.model.messageSync;
  }

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

  async setRead({ messageClassId, messageIds, all, userId }: any) {
    if (messageIds && messageIds.length > 0) {
      // update
      await this.modelMessageSync.update(
        {
          messageRead: 1,
        },
        {
          where: {
            userId,
            messageId: messageIds,
          },
        },
      );
    } else if (messageClassId > 0 && all) {
      // update
      await this.modelMessageSync.update(
        { messageRead: 1 },
        {
          where: {
            userId,
            messageClassId,
          },
        },
      );
    }
  }

  async delete({ messageIds, userId }: any) {
    // delete
    await this.modelMessageSync.delete({
      userId,
      messageId: messageIds,
    });
  }
}
