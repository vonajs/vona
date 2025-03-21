import type { Next } from 'vona';
import type { IDecoratorSocketPacketOptions, ISocketPacketExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import type { ISocketCabloyEventRecord, ISocketCabloyPerformActionOptions, TypeSocketPacketCabloy } from '../types/socket.ts';
import { BeanBase } from 'vona';
import { SocketPacket } from 'vona-module-a-socket';

export interface ISocketPacketOptionsPerformAction extends IDecoratorSocketPacketOptions {}

@SocketPacket<ISocketPacketOptionsPerformAction>({ match: 'cabloy', dependencies: 'cabloy-socket:cabloy' })
export class SocketPacketPerformAction extends BeanBase implements ISocketPacketExecute {
  async execute(packet: TypeSocketPacketCabloy, ws: WebSocket, _options: ISocketPacketOptionsPerformAction, next: Next): Promise<void> {
    const eventName: keyof ISocketCabloyEventRecord | undefined = packet[0];
    const data: ISocketCabloyPerformActionOptions = packet[1];
    if (eventName !== 'performAction') return next();
    try {
      const res = await this.bean.executor.performAction(data.m, data.p as never, {
        innerAccess: false,
        body: data.b,
        headers: data.h,
      });
      ws.sendEvent('performActionBack', { id: data.id, code: 0, data: res });
    } catch (err: any) {
      ws.sendEvent('performActionBack', { id: data.id, code: err.code, message: err.message });
    }
  }
}
