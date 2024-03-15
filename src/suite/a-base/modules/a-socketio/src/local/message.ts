import { BigNumber } from 'cabloy-module-api-a-database';
import { ScopeModule } from '../resource/this.js';
import { Local, BeanBase } from '@cabloy/core';

@Local()
export class LocalMessage extends BeanBase<ScopeModule> {
  get modelMessage() {
    return this.scope.model.message;
  }

  get modelMessageSync() {
    return this.scope.model.messageSync;
  }

  get sqlProcedure() {
    return this.scope.local.procedure;
  }

  async save({ message }: any) {
    // insert
    const res = await this.modelMessage.insert(message);
    return res[0];
  }

  async saveSync({ messageSync }: any) {
    // insert
    const res = await this.modelMessageSync.insert(messageSync);
    return res[0];
  }

  // the first unread message
  // options:
  //    where
  async offset({ messageClass, options, user }: any) {
    // messageClass
    messageClass = await this.ctx.bean.io.messageClass.get(messageClass);
    // where
    const where = (options && options.where) || {};
    where.iid = this.ctx.instance.id;
    where.deleted = 0;
    where.syncDeleted = 0;
    where.messageClassId = messageClass.id;
    where.userId = user ? user.id : 0;
    // messageRead
    if (where.messageRead === null) {
      delete where.messageRead;
    } else if (where.messageRead === undefined) {
      where.messageRead = 0;
    }
    // orders
    const _orders = (options && options.orders) || [['id', 'asc']];
    // offset
    const _offset = (options && options.offset) || 0;
    // offset
    const res = await this.bean.model.select('aSocketIOMessageView', {
      where,
      columns: ['id'],
      orders: _orders,
      limit: 1,
      offset: _offset,
    });
    // offset - 1
    const offset = res[0] ? res[0].id - 1 : -1;
    return { offset };
  }

  async select({ messageClass, options, user }: any) {
    return (await this._list({ messageClass, options, user, count: 0 })) as any[];
  }

  async count({ messageClass, options, user }: any): Promise<{ count: BigNumber }> {
    const count = (await this._list({ messageClass, options, user, count: 1 })) as BigNumber;
    return { count };
  }

  async setRead({ messageClass, messageIds, all, user }: any) {
    if ((!messageIds || messageIds.length === 0) && !all) return;
    if (all && !messageClass) return;
    // messageClass
    if (messageClass) {
      messageClass = await this.ctx.bean.io.messageClass.get(messageClass);
      const messageClassBase = this.ctx.bean.io.messageClass.messageClass(messageClass);
      const beanMessage = this.ctx.bean.io._getBeanMessage(messageClassBase);
      return await beanMessage.onSetRead({ messageClass, messageIds, all, user });
    }
    // default
    return await this._setRead({ messageClass, messageIds, all, user });
  }

  async _setRead({ messageClass, messageIds, all, user }: any) {
    const messageClassId = messageClass ? messageClass.id : 0;
    // query
    const sql = this.sqlProcedure.setRead({
      iid: this.ctx.instance.id,
      messageClassId,
      messageIds,
      all,
      userId: user ? user.id : 0,
    });
    if (sql) {
      await this.bean.model.query(sql);
    }
  }

  async delete({ messageIds, user }: any) {
    if (!messageIds || messageIds.length === 0) return;
    // query
    const sql = this.sqlProcedure.delete({
      iid: this.ctx.instance.id,
      messageIds,
      userId: user ? user.id : 0,
    });
    await this.bean.model.query(sql);
  }

  async _list({ messageClass, options, user, count }: any) {
    // messageClass
    messageClass = messageClass ? await this.ctx.bean.io.messageClass.get(messageClass) : null;
    // where
    const where = (options && options.where) || {};
    if (messageClass) {
      where.messageClassId = messageClass.id;
    }
    where.userId = user ? user.id : 0;
    // orders
    const orders = (options && options.orders) || [['createdAt', 'asc']];
    // query
    const items = await this.sqlProcedure.selectMessages({
      iid: this.ctx.instance.id,
      where,
      orders,
      page: options.page,
      offset: options.offset,
      count,
    });
    return count ? this.bean.model.extractCount(items) : items;
  }
}

// async saveSyncs({ messageClass, message, groupUsers, persistence }: any) {
//   // messageClassId
//   const messageClassId = messageClass.id;
//   // messageId
//   const messageId = message.id;
//   // message sync
//   const messageSyncs: any[] = [];
//   //  :userIdFrom
//   const isSame = message.userIdTo === message.userIdFrom;
//   messageSyncs.push({
//     messageClassId,
//     messageId,
//     userId: message.userIdFrom,
//     messageDirection: 1, // only use send
//     messageRead: 1,
//   });
//   //  :userIdTo
//   if (!message.messageGroup) {
//     // single chat
//     if (!isSame) {
//       messageSyncs.push({
//         messageClassId,
//         messageId,
//         userId: message.userIdTo,
//         messageDirection: 2, // receive
//         messageRead: 0,
//       });
//     }
//   } else {
//     // group chat
//     if (groupUsers) {
//       for (const groupUser of groupUsers) {
//         const _userIdTo = groupUser.userId;
//         if (_userIdTo !== message.userIdFrom) {
//           messageSyncs.push({
//             messageClassId,
//             messageId,
//             userId: _userIdTo,
//             messageDirection: 2, // receive
//             messageRead: 0,
//           });
//         }
//       }
//     }
//   }
//   //  :save
//   for (const messageSync of messageSyncs) {
//     // userId===0 not save to db
//     if (persistence && messageSync.userId !== 0) {
//       const res = await this.modelMessageSync.insert(messageSync);
//       messageSync.messageSyncId = res[0];
//     } else {
//       messageSync.messageSyncId = this.ctx.bean.util.uuid.v4();
//     }
//   }
//   // ok
//   return messageSyncs;
// }
