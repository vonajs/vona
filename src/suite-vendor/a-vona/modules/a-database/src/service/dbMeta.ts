import type { FunctionAny } from 'vona';
import type { IDatabaseClientRecord } from '../types/database.ts';
import type { ITransactionConsistencyCommitOptions } from '../types/transaction.ts';
import type { ServiceDatabaseClient } from './databaseClient.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';
import { ServiceTransactionConsistency‌ } from './transactionConsistency‌.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  private _databaseClientCurrent: ServiceDatabaseClient;
  private _transaction: ServiceTransaction;
  private _transactionConsistency: ServiceTransactionConsistency‌;

  protected __init__(clientName?: keyof IDatabaseClientRecord | ServiceDatabaseClient) {
    // must init eager, let ctx is same
    this._databaseClientCurrent = (!clientName || typeof clientName === 'string') ? this.app.bean.database.getClient(clientName) : clientName;
    this._transaction = this.app.bean._newBean(ServiceTransaction, this);
    this._transactionConsistency = this.app.bean._newBean(ServiceTransactionConsistency‌);
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

  get currentClientName() {
    return this.currentClient.clientName;
  }

  get current() {
    return this.inTransaction ? this.transaction.connection! : this.currentClient.db;
  }

  commit(cb: FunctionAny, options?: ITransactionConsistencyCommitOptions) {
    if (options?.ctxPrefer || !this.transaction.inTransaction) {
      this._transactionConsistency.commit(cb);
    } else {
      this.transaction.commit(cb);
    }
  }

  compensate(cb: FunctionAny) {
    if (this.transaction.inTransaction) {
      this.transaction.compensate(cb);
    }
  }

  async commitDone() {
    await this._transactionConsistency.commitDone();
  }
}
