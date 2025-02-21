import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  master: boolean;
  transaction: ServiceTransaction;

  protected __init__() {
    this.master = true;
    this.transaction = this.bean._newBean(ServiceTransaction);
  }
}
