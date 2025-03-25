import { AsyncResource } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  private _transaction: ServiceTransaction;
  private _tailCallbacks: ((...args: any[]) => any)[] = [];

  protected __init__() {}

  get transaction() {
    if (!this._transaction) {
      this._transaction = this.ctx.bean._newBean(ServiceTransaction);
    }
    return this._transaction;
  }

  set transaction(value) {
    this._transaction = value;
  }

  get inTransaction() {
    return this.transaction.inTransaction;
  }

  tail(cb: (...args: any[]) => any) {
    this._tailCallbacks.push(AsyncResource.bind(cb));
  }

  async tailDone() {
    while (true) {
      const cb = this._tailCallbacks.shift();
      if (!cb) break;
      await cb();
    }
  }
}
