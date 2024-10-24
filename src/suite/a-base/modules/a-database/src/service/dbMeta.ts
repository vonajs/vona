import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { ServiceTransaction } from './transaction.js';

@Service()
export class ServiceDbMeta extends BeanBase<ScopeModule> {
  master: boolean;
  transaction: ServiceTransaction;

  protected __init__() {
    this.master = true;
    this.transaction = this.bean._newBean(ServiceTransaction);
  }
}
