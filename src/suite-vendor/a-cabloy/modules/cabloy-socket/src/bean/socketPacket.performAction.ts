import type { Next } from 'vona';
import type { IDecoratorSocketPacketOptions, ISocketPacketExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import type { ISocketCabloyEventRecord, ISocketCabloyPerformActionOptionsInner, TypeSocketPacketCabloy } from '../types/socket.ts';
import { BeanBase } from 'vona';
import { SocketPacket } from 'vona-module-a-socket';

export interface ISocketPacketOptionsPerformAction extends IDecoratorSocketPacketOptions {}

@SocketPacket<ISocketPacketOptionsPerformAction>({ match: '/cabloy', dependencies: 'cabloy-socket:cabloy' })
export class SocketPacketPerformAction extends BeanBase implements ISocketPacketExecute {
  async execute(packet: TypeSocketPacketCabloy, ws: WebSocket, _options: ISocketPacketOptionsPerformAction, next: Next): Promise<void> {
    const eventName: keyof ISocketCabloyEventRecord | undefined = packet[0];
    const data: ISocketCabloyPerformActionOptionsInner = packet[1];
    if (eventName !== 'performAction') return next();
    // handshake
    try {
      let res;
      if (data.p === 'handshake') {
        res = await this._handShake(data.h);
      } else {
        res = await this.bean.executor.performActionInner(data.m, data.p as never, {
          innerAccess: false,
          body: data.b,
          headers: data.h,
        });
      }
      ws.sendEvent('performActionBack', { id: data.id, c: 0, d: res });
    } catch (err: any) {
      ws.sendEvent('performActionBack', { id: data.id, c: err.code, m: err.message });
    }
  }

  private async _handShake(headers?: object) {
    // headers
    if (headers) {
      Object.assign(this.ctx.req.headers, headers);
    }
    // auth token
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.checkAuthToken();
    }
    // check current
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.signinWithAnonymous();
    }
  }
}
