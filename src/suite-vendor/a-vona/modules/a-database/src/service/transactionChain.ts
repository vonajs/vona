import type knex from 'knex';
import type { FunctionAny } from 'vona';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceTransactionConsistency‌ } from './transactionConsistency‌.ts';

@Service()
export class ServiceTransactionChain extends BeanBase {
  private _connection: knex.Knex.Transaction;
  private _transactionConsistency: ServiceTransactionConsistency‌;

  protected __init__() {
    this._transactionConsistency = this.app.bean._newBean(ServiceTransactionConsistency‌);
  }

  public get connection() {
    return this._connection;
  }

  commit(cb: FunctionAny) {
    this._transactionConsistency.commit(cb);
  }

  compensate(cb: FunctionAny) {
    this._transactionConsistency.compensate(cb);
  }

  private async _commitDone() {
    await this._transactionConsistency.commitDone();
  }

  private async _compensateDone() {
    await this._transactionConsistency.compensateDone();
  }
}
