import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanIoDelivery } from './bean.io_delivery.js';

export class BeanIoPublish extends BeanIoDelivery {
  async publish({ path, message, messageClass, options }: any) {
    // messageClass
    messageClass = await this.messageClass.get(messageClass);
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    return await beanMessage.onPublish({ path, message, messageClass, options });
  }

  async publishMessageSystem({ message }: any) {
    await this.publish({
      path: '/a/socketio/messageSystem',
      message,
      messageClass: {
        module: __ThisModule__,
        messageClassName: 'messageSystem',
      },
    });
  }

  // called by messageBase.onPublish
  async _publish({ path, message, messageClass, options }: any) {
    // messageClass
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // options
    options = options || {};
    // scene
    if (options.scene === undefined) {
      options.scene = this.app.bean.util.getFrontClientId();
    }
    const messageScene = options.scene;

    // message/userId
    message.userIdFrom = parseInt(message.userIdFrom || 0);
    if (message.userIdTo === undefined || message.userIdTo === null) message.userIdTo = -3;
    message.userIdTo = parseInt(message.userIdTo || 0);
    const userIdFrom = message.userIdFrom;
    const userIdTo = message.userIdTo;
    // userIdsTo
    if (message.userIdsTo) {
      message.userIdsTo = message.userIdsTo.map(userId => parseInt(userId));
    }
    // sessionId
    const sessionId = await beanMessage.onSessionId({ path, message, options });
    // message
    const _message: any = {
      messageClassId: messageClass.id,
      messageType: message.messageType,
      messageFilter: message.messageFilter,
      messageGroup: message.messageGroup,
      messageScene,
      userIdTo,
      userIdFrom,
      sessionId,
      content: JSON.stringify(message.content), // should use string for db/queue
    };

    // save
    const persistence = this.self._checkPersistence({ options, message, messageClass });
    if (persistence) {
      _message.id = await this.message.save({ message: _message });
      _message.createdAt = new Date();
    } else {
      _message.id = message.id || this.app.bean.util.uuid.v4();
      _message.createdAt = new Date();
      _message.persistence = persistence;
    }

    // userIdsTo: not save, but use as save syncs
    if (message.userIdsTo) {
      _message.userIdsTo = message.userIdsTo;
    }

    // messageClass
    _message.module = messageClass.module;
    _message.messageClassName = messageClass.messageClassName;

    // debug
    const debug = this.ctx.app.bean.debug.get('io');
    debug(
      '_publish message: id:%s, scene:%s, userIdFrom:%d, userIdTo:%d, userIdsTo:%j',
      _message.id,
      _message.messageScene,
      _message.userIdFrom,
      _message.userIdTo,
      _message.userIdsTo,
    );
    debug('_publish path: %s', path);
    debug('_publish content: %j', message.content);

    // to queue
    this.scope.queue.process.push({
      path,
      options,
      message: _message,
      messageClass,
    });

    // ok
    return {
      id: _message.id,
    };
  }

  // called by messageBase.onProcess
  async _onProcessBase({ path, options, message, messageSyncs, messageClass }: any) {
    // to queue: delivery/push
    if (path) {
      // try delivery first, then try push if failed
      this.scope.queue.delivery.push({
        path,
        options,
        message,
        messageSyncs,
        messageClass,
      });
    } else {
      // push
      await this.self._pushQueuePush({ options, message, messageSyncs, messageClass });
    }
  }
}
