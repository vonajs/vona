import type { Next } from 'vona';
import type { IDecoratorSocketPacketOptions, ISocketPacketExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import type { TypeSocketPacketCabloy } from '../types/socket.ts';
import { BeanBase } from 'vona';
import { SocketPacket } from 'vona-module-a-socket';

export interface ISocketPacketOptionsPerformAction extends IDecoratorSocketPacketOptions {}

@SocketPacket<ISocketPacketOptionsPerformAction>({ match: 'cabloy', dependencies: 'cabloy-socket:cabloy' })
export class SocketPacketPerformAction extends BeanBase implements ISocketPacketExecute {
  async execute(packet: TypeSocketPacketCabloy, _ws: WebSocket, _options: ISocketPacketOptionsPerformAction, next: Next): Promise<void> {
    console.log(packet);
    // next
    return next();
  }
}
