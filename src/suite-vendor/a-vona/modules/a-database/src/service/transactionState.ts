import type { IDbInfo } from '../types/index.ts';
import type { ServiceTransactionChain } from './transactionChain.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceTransactionState extends BeanBase {
  private _chains: Record<string, ServiceTransactionChain> = {};

  public getTransactionChain(dbInfo: IDbInfo): ServiceTransactionChain {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    return this._chains[selector];
  }
}
