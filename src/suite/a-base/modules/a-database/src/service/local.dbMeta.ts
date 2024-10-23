import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../resource/this.js';
import { LocalTransaction } from './local.transaction.js';

@Service()
export class ServiceDbMeta extends BeanBase<ScopeModule> {
  master: boolean;
  transaction: LocalTransaction;

  protected __init__() {
    this.master = true;
    this.transaction = this.bean._newBean(LocalTransaction);
  }
}
