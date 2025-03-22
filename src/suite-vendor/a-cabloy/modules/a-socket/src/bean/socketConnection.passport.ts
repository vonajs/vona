import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsPassport extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsPassport>({ dependencies: 'a-socket:instance' })
export class SocketConnectionPassport extends BeanBase implements ISocketConnectionExecute {
  async enter(_ws: WebSocket, _options: ISocketConnectionOptionsPassport, next: Next): Promise<void> {
    // auth token
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.checkAuthToken();
    }
    // check current
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.signinWithAnonymous();
    }
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsPassport, next: Next): Promise<void> {
    // next
    return next();
  }
}
