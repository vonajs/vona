import type { Next } from 'vona';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionExecute } from 'vona-module-a-socket';
import type { WebSocket } from 'ws';
import { BeanBase } from 'vona';
import { SocketConnection } from 'vona-module-a-socket';

export interface ISocketConnectionOptionsAppReady extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsAppReady>({ dependencies: 'a-socket:base' })
export class SocketConnectionAppReady extends BeanBase implements ISocketConnectionExecute {
  async enter(_ws: WebSocket, _options: ISocketConnectionOptionsAppReady, next: Next): Promise<void> {
    // check appReady
    if (!this.ctx.innerAccess) {
      if (this.app.meta.appClose) this.app.throw(423);
      await this.$scope.instance.service.instance.checkAppReady();
    }
    // next
    return next();
  }

  async exit(_ws: WebSocket, _options: ISocketConnectionOptionsAppReady, next: Next): Promise<void> {
    // next
    return next();
  }
}
