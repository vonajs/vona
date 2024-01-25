module.exports = class IO {
  // called by messageBase.onDelivery
  async delivery({ path, options, message, messageSync, messageClass }) {
    // ignore delivery online if !path
    if (path) {
      const deliveryDone = await this.emit({ path, options, message, messageSync, messageClass });
      if (deliveryDone) return;
    }
    // to queue: push
    //   should not use await for performance
    this._pushQueuePush({ options, message, messageSyncs: [messageSync], messageClass });
  }

  // offline: return false
  //    hash key: userId:path
  //    hash value: scene -> workerId:socketId
  async emit({ path, options, message, messageSync /* , messageClass*/ }) {
    // userId
    const userId = messageSync.userId;
    if (!userId) return true;
    // options
    const messageScene = (options && options.scene) || '';
    // // no scene
    // if (!messageScene) {
    //   return await this._emitNoScene({ path, message, messageSync, messageScene });
    // }
    // scene
    return await this._emitScene({ path, options, message, messageSync, messageScene });
  }

  // return true when any emitSocket
  async _emitScene({ path, options, message, messageSync, messageScene }) {
    // userId
    const userId = messageSync.userId;
    const isSender = message.userIdFrom === userId;
    // debug
    const debug = this.ctx.app.bean.debug.get('io');
    debug(
      '_emitScene message: id:%s, scene:%s, userIdFrom:%d, userIdTo:%d, path:%s',
      message.id,
      messageScene,
      message.userIdFrom,
      userId,
      path,
    );
    // get hash value
    let values = messageSync._subscribeValuesByPath;
    if (values === undefined) {
      values = await this.localRedis._getSubscribeValuesByPath({ userId, path });
    }
    if (!values) {
      // offline
      //  only support offline-notification for receiver
      return !!isSender;
    }
    let bSent = false;
    for (const socketId in values) {
      const value = values[socketId];
      if (!isSender || value.scene !== messageScene) {
        debug(
          '_emitScene message socket: socketId:%s, cache scene:%s, message scene:%s',
          socketId,
          value.scene,
          messageScene,
        );
        this._emitSocket({ path, options, message, socketId });
        bSent = true;
      }
    }
    if (!bSent) {
      // offline
      //  only support offline-notification for receiver
      return !!isSender;
    }
    // done
    return true;
  }

  _emitSocket({ path, options, message, socketId }) {
    const messageEmit = { path, message, socketId };
    const messagesEmit = options?.collector?.messagesEmit;
    if (messagesEmit) {
      // collector
      messagesEmit.push(messageEmit);
    } else {
      // broadcast
      this.ctx.meta.util.broadcastEmit({
        module: moduleInfo.relativeName,
        broadcastName: 'socketEmit',
        data: { messageEmit },
      });
    }
  }

  // async _emitNoScene({ path, message, messageSync, messageScene }) {
  //   // userId
  //   const userId = messageSync.userId;
  //   const isSender = message.userIdFrom === userId;
  //   // ignore sender
  //   if (isSender) return true;
  //   // get hash value
  //   const key = `sub:${this.ctx.instance.id}:${userId}:${path}`;
  //   const socketId = await this.redis.hget(key, messageScene);
  //   if (!socketId) return false; // offline
  //   // emit
  //   this._emitSocket({ path, message, socketId });
  //   // done
  //   return true;
  // }
};
