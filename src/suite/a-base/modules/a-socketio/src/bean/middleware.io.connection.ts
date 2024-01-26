import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'middleware.io' })
export class MiddlewareIoConnection extends BeanBase {
  async execute(options, next) {
    // cache userId/socketId for disconnect
    const user = this.ctx.state.user && this.ctx.state.user.op;
    if (!user || user.anonymous) {
      // return this.ctx.throw(401);
      this.ctx.socket.emit('message-system', { code: 401, message: 'logout', type: 'self' });
      return;
    }
    // register
    const iid = user.iid;
    const socketId = this.ctx.socket.id;
    this.ctx.bean.io._registerSocket(socketId, this.ctx.socket);

    // register user online
    await this.ctx.bean.userOnline.register({ user: this.ctx.state.user, isLogin: false });
    // heartbeat
    const onHeartBeat = this._onHeartBeat.bind(this);
    this.ctx.socket.conn.on('heartbeat', onHeartBeat);
    // next
    await this._next({ next, user, socketId });
    this.ctx.socket.conn.off('heartbeat', onHeartBeat);

    // execute when disconnect
    this.ctx.bean.io._unRegisterSocket(socketId);
    await this.ctx.bean.io.unsubscribeWhenDisconnect({ iid, user, socketId });
  }

  async _onHeartBeat() {
    const user = this.ctx.state.user;
    const online = await this.ctx.bean.userOnline.heartBeat({ user });
    if (!online) {
      this.ctx.socket.emit('message-system', { code: 401, message: 'logout', type: 'self' });
      // close the underlying connection
      // this.ctx.socket.disconnect(true);
    }
  }

  async _next({ next, user, socketId }) {
    const debug = this.ctx.app.bean.debug.get('io');
    debug(`socket io connected: user:${user.id}, socket:${socketId}`);
    // next
    await next();
    debug(`socket io disconnected: user:${user.id}, socket:${socketId}`);
  }
}
