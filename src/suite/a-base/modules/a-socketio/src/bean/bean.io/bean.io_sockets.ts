const SOCKETSONLINE = Symbol.for('APP#__SOCKETSONLINE');

module.exports = class IO {
  _getSocketsOnline() {
    if (!this.ctx.app[SOCKETSONLINE]) {
      this.ctx.app[SOCKETSONLINE] = {};
    }
    return this.ctx.app[SOCKETSONLINE];
  }

  _registerSocket(socketId, socket) {
    const debug = this.ctx.app.bean.debug.get('io');
    debug('_registerSocket: workerId:%s, socketId:%s', this.ctx.app.meta.workerId, socketId);
    const socketsOnline = this._getSocketsOnline();
    socketsOnline[socketId] = socket;
  }

  _unRegisterSocket(socketId) {
    const debug = this.ctx.app.bean.debug.get('io');
    debug('_unRegisterSocket: workerId:%s, socketId:%s', this.ctx.app.meta.workerId, socketId);
    const socketsOnline = this._getSocketsOnline();
    delete socketsOnline[socketId];
  }

  broadcastSocketEmit({ messagesEmit, messageEmit }) {
    if (messagesEmit) {
      const debug = this.ctx.app.bean.debug.get('io');
      debug('socketEmit broadcast: count:%d, workerId:%s', messagesEmit.length, this.ctx.app.meta.workerId);
      for (const messageEmit of messagesEmit) {
        this._broadcastSocketEmit_single({ messageEmit });
      }
    } else {
      this._broadcastSocketEmit_single({ messageEmit });
    }
  }

  _broadcastSocketEmit_single({ messageEmit }) {
    const { path, message, socketId } = messageEmit;
    const socketsOnline = this._getSocketsOnline();
    const socket = socketsOnline[socketId];
    const debug = this.ctx.app.bean.debug.get('io');
    debug(
      'socketEmit broadcast: workerId:%s, socketIds:%s',
      this.ctx.app.meta.workerId,
      Object.keys(socketsOnline).join(','),
    );
    debug('socketEmit broadcast: found:%d, workerId:%s, socketId:%s', !!socket, this.ctx.app.meta.workerId, socketId);
    if (socket) {
      socket.emit('message', { path, message });
    }
  }
};
