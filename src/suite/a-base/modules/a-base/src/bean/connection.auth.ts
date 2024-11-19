import { BeanBase, Connection, IConnectionExecute, IDecoratorConnectionOptions, Next } from 'vona';

export interface IConnectionOptionsAuth extends IDecoratorConnectionOptions {}

@Connection<IConnectionOptionsAuth>()
export class ConnectionAuth extends BeanBase implements IConnectionExecute {
  async execute(options: IConnectionOptionsAuth, next: Next) {
    // check
    await this.app.bean.user.check(options);
    // next
    return next();
  }
}
