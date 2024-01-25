module.exports = class IOInner {
  get messageClass() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).messageClass;
  }

  get message() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).message;
  }

  get localRedis() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).redis;
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

  _getBeanChannel(channelFullName) {
    // get channel base
    const channelBase = this.messageClass.channel(channelFullName);
    if (!channelBase) {
      this.ctx.logger.info(`channel not found: ${channelFullName}`);
      return null;
    }
    // bean
    const beanFullName = `${channelBase.info.module}.io.channel.${channelBase.info.bean}`;
    const beanChannel = this.ctx.bean._getBean(beanFullName);
    if (!beanChannel) {
      this.ctx.logger.info(`channel bean not found: ${beanFullName}`);
      return null;
    }
    return beanChannel;
  }

  async _loopMessageSyncs({ path, message, messageSyncs, onHandle }) {
    // array
    if (messageSyncs) {
      await this._loopMessageSyncs_handle({ path, messageSyncs, onHandle });
      return;
    }
    // from db
    // saveLimit
    const saveLimit = this.ctx.config.module(moduleInfo.relativeName).message.sync.saveLimit;
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

  async _loopMessageSyncs_handle({ path, messageSyncs, onHandle }) {
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
};
