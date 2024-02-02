import { BeanIoChannelBase } from '../../common/ioChannelBase.js';
import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class LocalIoInner0 extends BeanBase<ScopeModule> {
  get messageClass() {
    return this.scope.local.messageClass;
  }

  get message() {
    return this.scope.local.message;
  }

  get localRedis() {
    return this.scope.local.redis;
  }

  _getBeanMessage(messageClassBase) {
    // beanFullName
    let beanFullName;
    if (messageClassBase.info.bean) {
      beanFullName = `${messageClassBase.info.module}.io.message.${messageClassBase.info.bean}`;
    } else if (messageClassBase.info.uniform) {
      beanFullName = 'a-message.local.ioMessageUniformBase';
    } else {
      beanFullName = 'a-socketio.local.ioMessageBase';
    }
    // bean
    const beanMessage = this.ctx.bean._getBean(beanFullName);
    if (!beanMessage) {
      this.ctx.logger.info(`message bean not found: ${beanFullName}`);
      return null;
    }
    return beanMessage;
  }

  _getBeanChannel(channelFullName): BeanIoChannelBase | null {
    // get channel base
    const channelBase = this.messageClass.channel(channelFullName);
    if (!channelBase) {
      this.ctx.logger.info(`channel not found: ${channelFullName}`);
      return null;
    }
    // bean
    const beanFullName = `${channelBase.info.module}.io.channel.${channelBase.info.bean}`;
    const beanChannel = this.ctx.bean._getBean(beanFullName) as BeanIoChannelBase;
    if (!beanChannel) {
      this.ctx.logger.info(`channel bean not found: ${beanFullName}`);
      return null;
    }
    return beanChannel;
  }

  async _loopMessageSyncs({ path, message, messageSyncs, onHandle }: any) {
    // array
    if (messageSyncs) {
      await this._loopMessageSyncs_handle({ path, messageSyncs, onHandle });
      return;
    }
    // from db
    // saveLimit
    const saveLimit = this.scope.config.message.sync.saveLimit;
    const modelMessageSync = this.message.modelMessageSync;
    let offset = 0;
    // eslint-disable-next-line
    while (true) {
      // mess
      const messageSyncs = await modelMessageSync.select({
        where: {
          messageId: message.id,
          // messageRead:0, ??
        },
        limit: saveLimit,
        offset,
      });
      // handle
      await this._loopMessageSyncs_handle({ path, messageSyncs, onHandle });
      // next
      if (messageSyncs.length < saveLimit) {
        break;
      } else {
        offset += saveLimit;
      }
    }
  }

  async _loopMessageSyncs_handle({ path, messageSyncs, onHandle }: any) {
    if (path) {
      // userIds
      const userIds = messageSyncs.map(item => item.userId).filter(userId => userId > 0);
      const subscribeValuesByPathBatch = await this.localRedis._getSubscribeValuesByPathBatch({
        userIds,
        path,
      });
      messageSyncs.forEach(item => {
        const _subscribeValuesByPath = subscribeValuesByPathBatch[item.userId];
        if (_subscribeValuesByPath !== undefined) {
          item._subscribeValuesByPath = _subscribeValuesByPath;
        }
      });
    }
    // loop
    for (const messageSync of messageSyncs) {
      await onHandle(messageSync);
    }
  }
}
