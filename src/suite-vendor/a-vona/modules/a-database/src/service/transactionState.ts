import type knex from 'knex';
import type { IDbInfo } from '../types/index.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceTransactionChain } from './transactionChain.ts';

@Service()
export class ServiceTransactionState extends BeanBase {
  private _chains: Record<string, ServiceTransactionChain> = {};

  public getTransactionChain(dbInfo: IDbInfo): ServiceTransactionChain | undefined {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    return this._chains[selector];
  }

  public add(dbInfo: IDbInfo, connection: knex.Knex.Transaction) {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    const chain = this.bean._newBean(ServiceTransactionChain, connection);
    this._chains[selector] = chain;
    return chain;
  }

  public remove(dbInfo: IDbInfo) {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    delete this._chains[selector];
  }
}
