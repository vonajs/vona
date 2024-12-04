import { BeanBase, IDecoratorSocketPacketOptions, ISocketPacketExecute, Next, SocketPacket } from 'vona';

export interface ISocketPacketOptionsPerformAction extends IDecoratorSocketPacketOptions {}

@SocketPacket<ISocketPacketOptionsPerformAction>()
export class SocketPacketPerformAction extends BeanBase implements ISocketPacketExecute {
  async execute(packet: any[], _options: ISocketPacketOptionsPerformAction, next: Next) {
    const eventName = packet[0];
    if (eventName === 'performAction') {
      await this._performAction({ params: packet[1] });
    }
    // next
    return next();
  }

  async _performAction({ params: { id, method, url, body } }) {
    try {
      // headers
      const headers: any = {};
      for (const key of ['x-clientid', 'x-scene']) {
        if (this.ctx.request.query[key]) {
          headers[key] = this.ctx.request.query[key];
        }
      }
      // params
      const params = {
        method: method || 'post',
        url,
        body,
        headers,
        innerAccess: false, // force innerAccess as false
      };
      // performAction
      const data = await this.ctx.meta.util.performAction(params);
      this.ctx.socket.emit('performAction-callback', {
        id,
        result: {
          code: 0,
          data,
        },
      });
    } catch (err: any) {
      this.ctx.socket.emit('performAction-callback', {
        id,
        result: {
          code: err.code,
          message: err.message,
        },
      });
    }
  }
}
