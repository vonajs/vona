import { BeanBase, Service } from 'vona';
import { ServiceTransaction } from './transaction.js';

@Service()
export class ServiceDbMeta extends BeanBase {
  master: boolean;
  transaction: ServiceTransaction;

  protected __init__() {
    this.master = true;
    this.transaction = this.bean._newBean(ServiceTransaction);
  }
}
