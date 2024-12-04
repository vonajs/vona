import { BeanBase, SocketConnection, ISocketConnectionExecute, IDecoratorSocketConnectionOptions, Next } from 'vona';

export interface ISocketConnectionOptionsAuth extends IDecoratorSocketConnectionOptions {}

@SocketConnection<ISocketConnectionOptionsAuth>()
export class SocketConnectionAuth extends BeanBase implements ISocketConnectionExecute {
  async execute(options: ISocketConnectionOptionsAuth, next: Next) {
    // check
    await this.app.bean.user.check(options);
    // next
    return next();
  }
}
