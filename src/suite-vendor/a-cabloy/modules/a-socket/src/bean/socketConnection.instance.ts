import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsInstance extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsInstance>()
export class SocketConnectionInstance extends BeanBase implements ISocketConnectionExecute {
  async enter(_ws: WebSocket, _options: ISocketConnectionOptionsInstance, next: Next): Promise<void> {
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsInstance, next: Next): Promise<void> {
    // next
    return next();
  }
}
