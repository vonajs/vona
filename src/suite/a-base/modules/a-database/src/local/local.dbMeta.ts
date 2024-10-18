import { BeanBase, Local } from 'vona';
import { ScopeModule } from '../resource/this.js';
import { LocalTransaction } from './local.transaction.js';

@Local()
export class LocalDbMeta extends BeanBase<ScopeModule> {
  master: boolean;
  transaction: LocalTransaction;

  protected __init__() {
    this.master = true;
    this.transaction = this.bean._newBean(LocalTransaction);
  }
}
