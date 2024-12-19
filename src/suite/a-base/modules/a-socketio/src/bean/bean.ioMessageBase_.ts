import { Virtual } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';

@Virtual()
export class BeanIoMessageBase extends BeanBase {
  get scopeModuleASocketio() {
    return this.getScope(__ThisModule__);
  }

  async onSessionId({ /* path,*/ message /* options*/ }: any) {
    const userIdFrom = message.userIdFrom;
    const userIdTo = message.userIdTo;
    return message.messageGroup ? userIdTo : this._combineSessionId(userIdFrom, userIdTo);
  }

  async onProcess({ path, options, message, messageSyncs, messageClass }: any) {
    return await this.app.bean.io._onProcessBase({ path, options, message, messageSyncs, messageClass });
  }

  async onSaveSyncs({ path, options, message, messageClass }: any) {
    return await this.app.bean.io._onSaveSyncs({ path, options, message, messageClass });
  }

  async onSaveSyncsPolicy({ path, options, message, messageClass, saveLimit, onSave }: any) {
    return await this.app.bean.io._onSaveSyncsPolicy({ path, options, message, messageClass, saveLimit, onSave });
  }

  async onSaveSync(/* { path, options, message, messageSync, messageClass }*/ _params: any) {
    return null;
  }

  async onDelivery({ path, options, message, messageSync, messageClass }: any) {
    return await this.app.bean.io.delivery({ path, options, message, messageSync, messageClass });
  }

  async onPushEnable({ /* options, message, messageSyncs,*/ messageClass }: any) {
    const messageClassBase = this.app.bean.io.messageClass.messageClass(messageClass);
    return !!(messageClassBase.info.push && messageClassBase.info.push.channels);
  }

  async onPush({ options, message, messageSync, messageClass }: any) {
    return await this.app.bean.io.push({ options, message, messageSync, messageClass });
  }

  async onChannels({ /* options, message, messageSync,*/ messageClass }: any) {
    const messageClassBase = this.app.bean.io.messageClass.messageClass(messageClass);
    return messageClassBase.info.push && messageClassBase.info.push.channels;
  }

  async onChannelRender(
    /* { channelFullName, options, message, messageSync, messageClass }*/ _params: any,
  ): Promise<any> {
    return null;
  }

  async onPublish({ path, message, messageClass, options }: any) {
    return await this.app.bean.io._publish({ path, message, messageClass, options });
  }

  async onSetRead({ messageClass, messageIds, all, user }: any) {
    return await this.app.bean.io.message._setRead({ messageClass, messageIds, all, user });
  }

  // combine sessionId
  _combineSessionId(userIdFrom, userIdTo) {
    if (userIdFrom === userIdTo) return userIdFrom;
    return `${userIdFrom > userIdTo ? userIdFrom : userIdTo}:${userIdFrom < userIdTo ? userIdFrom : userIdTo}`;
  }
}
