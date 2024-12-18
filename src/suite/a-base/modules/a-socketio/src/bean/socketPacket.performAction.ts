import { BeanBase, Next } from 'vona';
import { IDecoratorSocketPacketOptions, ISocketPacketExecute, SocketPacket } from 'vona-module-a-socket';

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

  async _performAction({ params: { id, method, path, body } }) {
    try {
      // headers
      const headers: any = {};
      for (const key of ['x-clientid', 'x-scene']) {
        if (this.ctx.request.query[key]) {
          headers[key] = this.ctx.request.query[key];
        }
      }
      // options
      const options = {
        body,
        headers,
        innerAccess: false, // force innerAccess as false
      };
      // performAction
      method = method || 'post';
      const data = await this.bean.executor.performAction(method, path, options);
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
