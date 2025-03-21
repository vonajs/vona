import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase, uuidv4 } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsBase extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsBase>()
export class SocketConnectionBase extends BeanBase implements ISocketConnectionExecute {
  private _interval: any;

  protected async __dispose__() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  async enter(ws: WebSocket, _options: ISocketConnectionOptionsBase, next: Next): Promise<void> {
    // id
    ws.id = uuidv4();
    // isAlive
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
    // start interval
    this._startInterval();
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsBase, next: Next): Promise<void> {
    // next
    return next();
  }

  private _startInterval() {
    if (this._interval) return;
    this._interval = setInterval(() => {
      this.app.wss.clients.forEach(ws => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, this.scope.config.timeout.ping);
  }
}
