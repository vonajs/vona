import type knex from 'knex';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceTransactionConsistency‌ } from './transactionConsistency‌.ts';

@Service()
export class ServiceTransactionChain extends BeanBase {
  private _connection?: knex.Knex.Transaction;
  private _transactionConsistency: ServiceTransactionConsistency‌;

  protected __init__() {
    this._transactionConsistency = this.app.bean._newBean(ServiceTransactionConsistency‌);
  }
}
