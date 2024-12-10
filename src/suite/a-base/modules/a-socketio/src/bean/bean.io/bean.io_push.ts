import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanIoPublish } from './bean.io_publish.js';

export class BeanIoPush extends BeanIoPublish {
  async pushDirect({ content, channel, options }: any) {
    this.scope.queue.pushDirect.push({
      content,
      channel,
      options,
    });
  }

  async push({ options, message, messageSync, messageClass }: any) {
    // userId
    const userId = messageSync.userId;
    const isSender = message.userIdFrom === userId;
    // ignore sender
    if (isSender) return true;
    // adjust auto
    const autoFirstValid = !options || !options.push || options.push.AtMostOnce !== false;
    // channels
    const channels = await this._getChannels({ options, message, messageSync, messageClass });
    if (!channels) return false;
    // loop
    let atLeastDone = false;
    for (const channelFullName of channels) {
      const res = await this._pushChannel({ options, message, messageSync, messageClass, channelFullName });
      if (!res) continue;
      atLeastDone = true;
      if (autoFirstValid) break;
    }
    // log
    if (!atLeastDone) {
      this.ctx.logger.info('not found any valid channel for this message:', message);
      return false;
    }
    // done
    return true;
  }

  async _pushQueuePush({ options, message, messageSyncs, messageClass }: any) {
    // check if enable push
    const pushEnable = await this._checkPushEnable({ options, message, messageSyncs, messageClass });
    if (!pushEnable) return;
    // queue
    this.scope.queue.push.push({
      options,
      message,
      messageSyncs,
      messageClass,
    });
  }

  async _checkPushEnable({ options, message, messageSyncs, messageClass }: any) {
    // options maybe set push.channels
    const channels = options && options.push && options.push.channels;
    if (channels) return true;
    // bean
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // check if enable push
    return await beanMessage.onPushEnable({ options, message, messageSyncs, messageClass });
  }

  async _getChannels({ options, message, messageSync, messageClass }: any) {
    // options maybe set push.channels
    const channels = options && options.push && options.push.channels;
    if (channels) return channels;
    // bean
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    return await beanMessage.onChannels({ options, message, messageSync, messageClass });
  }

  async _pushChannel({ options, message, messageSync, messageClass, channelFullName }: any) {
    try {
      // bean
      const messageClassBase = this.messageClass.messageClass(messageClass);
      const beanMessage = this._getBeanMessage(messageClassBase, false);
      if (!beanMessage) return false;
      // render message content
      const content = await beanMessage.onChannelRender({
        channelFullName,
        options,
        message,
        messageSync,
        messageClass,
      });
      if (!content) return false;
      // get channel base
      const beanChannel = this._getBeanChannel(channelFullName);
      if (!beanChannel) {
        return false;
      }
      // push
      const pushDone = await beanChannel.onPush({ content, options, message, messageSync, messageClass });
      if (!pushDone) return false;
      // done this channel
      return true;
    } catch (err) {
      // log
      this.ctx.logger.error(err);
      return false;
    }
  }
}
