import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import type { ISocketCabloyEventRecord, TypeSocketPacketCabloy } from '../types/socket.ts';
import { BeanBase } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsCabloy extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsCabloy>()
export class SocketConnectionCabloy extends BeanBase implements ISocketConnectionExecute {
  async enter(ws: WebSocket, _options: ISocketConnectionOptionsCabloy, next: Next): Promise<void> {
    ws.sendEvent = (eventName: keyof ISocketCabloyEventRecord, data, cb) => {
      const packet: TypeSocketPacketCabloy = [eventName, data];
      ws.send(JSON.stringify(packet), cb);
    };
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsCabloy, next: Next): Promise<void> {
    // next
    return next();
  }
}
