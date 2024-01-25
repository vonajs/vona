module.exports = class IOInner {
  // queue: delivery
  async queueDelivery({ path, options, message, messageSyncs, messageClass }) {
    // bean
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // collector
    options = Object.assign(options, { collector: { messagesEmit: [] } });
    // loop
    await this._loopMessageSyncs({
      path,
      options,
      message,
      messageSyncs,
      messageClass,
      onHandle: async messageSync => {
        if (messageSync.userId === -1) {
          // must be set path
          if (path) {
            // broadcast to online users
            const userIds = await this.localRedis._getPathUsersOnline({ path });
            const subscribeValuesByPathBatch = await this.localRedis._getSubscribeValuesByPathBatch({
              userIds,
              path,
            });
            for (const userId of userIds) {
              const _messageSync = {
                ...messageSync,
                userId,
                _subscribeValuesByPath: subscribeValuesByPathBatch[userId],
              };
              await beanMessage.onDelivery({ path, options, message, messageSync: _messageSync, messageClass });
            }
          }
        } else {
          // normal
          await beanMessage.onDelivery({ path, options, message, messageSync, messageClass });
        }
      },
    });
    // handle collector
    const messagesEmit = options.collector.messagesEmit;
    if (messagesEmit.length > 0) {
      this.ctx.meta.util.broadcastEmit({
        module: moduleInfo.relativeName,
        broadcastName: 'socketEmit',
        data: { messagesEmit },
      });
    }
  }
};
