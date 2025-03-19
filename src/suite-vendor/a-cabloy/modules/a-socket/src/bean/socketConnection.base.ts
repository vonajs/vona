import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase, uuidv4 } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsBase extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsBase>()
export class SocketConnectionBase extends BeanBase implements ISocketConnectionExecute {
  async enter(ws: WebSocket, _options: ISocketConnectionOptionsBase, next: Next): Promise<void> {
    ws.id = uuidv4();
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsBase, next: Next): Promise<void> {
    // next
    return next();
  }
}
