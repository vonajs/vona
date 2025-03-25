import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  master: boolean;
  private _transaction: ServiceTransaction;

  protected __init__() {
    this.master = true;
  }

  get transaction() {
    if (!this._transaction) {
      this._transaction = this.ctx.bean._newBean(ServiceTransaction);
    }
    return this._transaction;
  }

  set transaction(value) {
    this._transaction = value;
  }
}
