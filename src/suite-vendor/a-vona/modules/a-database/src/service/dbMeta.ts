import type { ServiceDatabaseClient } from './databaseClient.ts';
import { AsyncResource } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  private _databaseClientCurrent: ServiceDatabaseClient;
  private _transaction: ServiceTransaction;
  private _tailCallbacks: ((...args: any[]) => any)[] = [];

  protected __init__() {
    // must init eager, let ctx is same
    this._databaseClientCurrent = this.app.bean.database.getClientDefault();
    this._transaction = this.ctx.bean._newBean(ServiceTransaction, this);
  }

  get transaction() {
    return this._transaction;
  }

  set transaction(value) {
    this._transaction = value;
  }

  get inTransaction() {
    return this.transaction.inTransaction;
  }

  get currentClient() {
    return this._databaseClientCurrent;
  }

  set currentClient(value) {
    this._databaseClientCurrent = value;
  }

  get current() {
    return this.inTransaction ? this.transaction.connection! : this.currentClient.db;
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
