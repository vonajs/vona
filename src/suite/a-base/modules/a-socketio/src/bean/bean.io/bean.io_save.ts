import { __ThisModule__ } from '../../resource/this.js';
import { BeanIoPush } from './bean.io_push.js';

export class BeanIoSave extends BeanIoPush {
  _checkPersistence({ options, /* message,*/ messageClass }) {
    // // 1.
    // if (message.userIdTo === -2 || message.userIdsTo) return true;
    // 2.
    if (options && options.persistence !== undefined) return options.persistence;
    // 3.
    const messageClassBase = this.messageClass.messageClass(messageClass);
    return messageClassBase.info.persistence;
  }

  // called by messageBase.onSaveSyncs
  // support userIdTo/userIdsTo
  //   userIdTo: 0/-1/-2/-3
  async _onSaveSyncs({ path, options, message, messageClass }) {
    // messageClass
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // persistence
    const persistence = this._checkPersistence({ options, message, messageClass });
    // messageClassId
    const messageClassId = messageClass.id;
    // messageId
    const messageId = message.id;
    // message syncs
    let messageSyncs = [];
    // saveLimit
    const saveLimit = this.ctx.config.module(__ThisModule__).message.sync.saveLimit;
    // sender
    //   not save ===0
    if (message.userIdFrom !== 0) {
      // save
      const messageSync = {
        messageClassId,
        messageId,
        userId: message.userIdFrom,
        messageDirection: 1,
        messageRead: 1,
      };
      if (persistence) {
        messageSync.id = await this.message.saveSync({ messageSync });
      } else {
        messageSync.id = this.ctx.bean.util.uuid.v4();
        messageSync.persistence = persistence;
      }
      // extensible
      await beanMessage.onSaveSync({ path, options, message, messageSync, messageClass });
      // push
      messageSyncs.push(messageSync);
    }
    // receiver
    await beanMessage.onSaveSyncsPolicy({
      path,
      options,
      message,
      messageClass,
      saveLimit,
      onSave: async userIds => {
        // over limit
        if (messageSyncs && messageSyncs.length > 1) {
          // means enter this callback again
          messageSyncs = null;
        }
        // syncs
        for (const userIdTo of userIds) {
          if (userIdTo !== message.userIdFrom && userIdTo !== 0) {
            // save
            const messageSync = {
              messageClassId,
              messageId,
              userId: userIdTo,
              messageDirection: 2, // receive
              messageRead: 0,
            };
            if (persistence) {
              messageSync.id = await this.message.saveSync({ messageSync });
            } else {
              messageSync.id = this.ctx.bean.util.uuid.v4();
            }
            // extensible
            await beanMessage.onSaveSync({ path, options, message, messageSync, messageClass });
            // push
            if (messageSyncs) {
              messageSyncs.push(messageSync);
            }
          }
        }
      },
    });
    // array / null
    return messageSyncs;
  }

  // called by messageBase.onSaveSyncsPolicy
  // support userIdTo/userIdsTo
  //   userIdTo: 0/-1/-2/-3
  async _onSaveSyncsPolicy({ path, options, message, messageClass, saveLimit, onSave }) {
    // userIdsTo
    if (message.userIdsTo) {
      return await this._onSaveSyncsPolicy_userIdsTo({ path, options, message, messageClass, saveLimit, onSave });
    }
    // -1
    if (message.userIdTo === -1) {
      // only delivery to the online users
      return await onSave([message.userIdTo]);
    } else if (message.userIdTo === -2) {
      // all users
      return await this._onSaveSyncsPolicy_userIdsAll({ path, options, message, messageClass, saveLimit, onSave });
    } else if (message.userIdTo === -3) {
      // unknown user, but also should create messageSync for push
      return await onSave([message.userIdTo]);
    } else if (message.userIdTo === 0) {
      // system user: ignore
      return await onSave([]);
    }
    // normal user
    return await onSave([message.userIdTo]);
  }

  async _onSaveSyncsPolicy_userIdsTo({ message, saveLimit, onSave }) {
    const loop = Math.ceil(message.userIdsTo.length / saveLimit);
    for (let i = 0; i < loop; i++) {
      const userIds = message.userIdsTo.slice(i * saveLimit, (i + 1) * saveLimit);
      await onSave(userIds);
    }
  }

  async _onSaveSyncsPolicy_userIdsAll({ saveLimit, onSave }) {
    const modelUser = this.ctx.model.module('a-base').user;
    let offset = 0;
    // eslint-disable-next-line
    while (true) {
      // users
      const users = await modelUser.select({
        where: { disabled: 0 },
        columns: ['id'],
        limit: saveLimit,
        offset,
      });
      // save
      await onSave(users.map(item => item.id));
      // next
      if (users.length < saveLimit) {
        break;
      } else {
        offset += saveLimit;
      }
    }
  }
}
