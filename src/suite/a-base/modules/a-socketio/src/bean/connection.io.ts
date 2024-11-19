import { BeanBase, Connection, IConnectionExecute, IDecoratorConnectionOptions, Next } from 'vona';

export interface IConnectionOptionsIo extends IDecoratorConnectionOptions {}

@Connection<IConnectionOptionsIo>({ dependencies: 'a-base:auth' })
export class ConnectionIo extends BeanBase implements IConnectionExecute {
  async execute(_options: IConnectionOptionsIo, next: Next) {
    // todo: user是否有效不必在这里判断，从而让socket支持匿名用户
    // 因此，也就不需要在之前使用middleware.io.connectionAuth
    //   因为，packet中间件会执行performAction，而performAction会走整个router范围内的web中间件，从而与web开发保持一致的中间件体系
    //   如果某个controller只允许socket访问，可以通过gate中间件指定socket: true即可
    // cache userId/socketId for disconnect
    const user = this.ctx.state.user && this.ctx.state.user.op;
    if (!user || user.anonymous) {
      // return this.app.throw(401);
      this.ctx.socket.emit('message-system', { code: 401, message: 'logout', type: 'self' });
      return;
    }
    // register
    const iid = user.iid;
    const socketId = (<any>this.ctx.socket).id;
    this.ctx.bean.io._registerSocket(socketId, this.ctx.socket);

    // register user online
    await this.ctx.bean.userOnline.register({ user: this.ctx.state.user, isLogin: false });
    // heartbeat
    const onHeartBeat = this._onHeartBeat.bind(this);
    (<any>this.ctx.socket).conn.on('heartbeat', onHeartBeat);
    // next
    await this._next({ next, user, socketId });
    (<any>this.ctx.socket).conn.off('heartbeat', onHeartBeat);

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

  async _next({ next, user, socketId }: any) {
    const debug = this.ctx.app.bean.debug.get('io');
    debug(`socket io connected: user:${user.id}, socket:${socketId}`);
    // next
    await next();
    debug(`socket io disconnected: user:${user.id}, socket:${socketId}`);
  }
}
