import { BeanBase, Virtual } from '@cabloy/core';

@Virtual({ scene: 'bean' })
export class BeanIoMessageBase extends BeanBase {
  async onSessionId({ /* path,*/ message /* options*/ }) {
    const userIdFrom = message.userIdFrom;
    const userIdTo = message.userIdTo;
    return message.messageGroup ? userIdTo : this._combineSessionId(userIdFrom, userIdTo);
  }

  async onProcess({ path, options, message, messageSyncs, messageClass }) {
    return await this.ctx.bean.io._onProcessBase({ path, options, message, messageSyncs, messageClass });
  }

  async onSaveSyncs({ path, options, message, messageClass }) {
    return await this.ctx.bean.io._onSaveSyncs({ path, options, message, messageClass });
  }

  async onSaveSyncsPolicy({ path, options, message, messageClass, saveLimit, onSave }) {
    return await this.ctx.bean.io._onSaveSyncsPolicy({ path, options, message, messageClass, saveLimit, onSave });
  }

  async onSaveSync(/* { path, options, message, messageSync, messageClass }*/) {
    return null;
  }

  async onDelivery({ path, options, message, messageSync, messageClass }) {
    return await this.ctx.bean.io.delivery({ path, options, message, messageSync, messageClass });
  }

  async onPushEnable({ /* options, message, messageSyncs,*/ messageClass }) {
    const messageClassBase = this.ctx.bean.io.messageClass.messageClass(messageClass);
    return !!(messageClassBase.info.push && messageClassBase.info.push.channels);
  }

  async onPush({ options, message, messageSync, messageClass }) {
    return await this.ctx.bean.io.push({ options, message, messageSync, messageClass });
  }

  async onChannels({ /* options, message, messageSync,*/ messageClass }) {
    const messageClassBase = this.ctx.bean.io.messageClass.messageClass(messageClass);
    return messageClassBase.info.push && messageClassBase.info.push.channels;
  }

  async onChannelRender(/* { channelFullName, options, message, messageSync, messageClass }*/) {
    return null;
  }

  async onPublish({ path, message, messageClass, options }) {
    return await this.ctx.bean.io._publish({ path, message, messageClass, options });
  }

  async onSetRead({ messageClass, messageIds, all, user }) {
    return await this.ctx.bean.io.message._setRead({ messageClass, messageIds, all, user });
  }

  // combine sessionId
  _combineSessionId(userIdFrom, userIdTo) {
    if (userIdFrom === userIdTo) return userIdFrom;
    return `${userIdFrom > userIdTo ? userIdFrom : userIdTo}:${userIdFrom < userIdTo ? userIdFrom : userIdTo}`;
  }
}
