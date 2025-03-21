import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import type { ISocketCabloyEventRecord } from '../types/socket.ts';
import { BeanBase } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';
import { socketCabloyEventRecord } from '../types/socket.ts';

export interface ISocketConnectionOptionsCabloy extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsCabloy>()
export class SocketConnectionCabloy extends BeanBase implements ISocketConnectionExecute {
  async enter(ws: WebSocket, _options: ISocketConnectionOptionsCabloy, next: Next): Promise<void> {
    ws.sendEvent = (eventName: keyof ISocketCabloyEventRecord, data, cb) => {
      const eventNameInner = socketCabloyEventRecord[eventName] ?? eventName;
      ws.send(JSON.stringify([eventNameInner, data]), cb);
    };
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsCabloy, next: Next): Promise<void> {
    // next
    return next();
  }
}
