import type { Next } from 'vona';
import type { IDecoratorSocketPacketOptions, ISocketPacketExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase } from 'vona';
import { SocketPacket } from 'vona-module-a-socket';

export interface ISocketPacketOptionsCabloy extends IDecoratorSocketPacketOptions {}

@SocketPacket<ISocketPacketOptionsCabloy>({ match: 'cabloy' })
export class SocketPacketCabloy extends BeanBase implements ISocketPacketExecute {
  async execute(_data: any, _ws: WebSocket, _options: ISocketPacketOptionsCabloy, next: Next): Promise<void> {
    // next
    return next();
  }
}
