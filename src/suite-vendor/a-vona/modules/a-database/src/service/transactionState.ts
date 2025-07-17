import type knex from 'knex';
import type { IDbInfo } from '../types/index.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceTransactionFiber } from './transactionFiber.ts';

@Service()
export class ServiceTransactionState extends BeanBase {
  private _fibers: Record<string, ServiceTransactionFiber> = {};

  public get(dbInfo: IDbInfo): ServiceTransactionFiber | undefined {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    return this._fibers[selector];
  }

  public add(dbInfo: IDbInfo, connection: knex.Knex.Transaction) {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    const chain = this.bean._newBean(ServiceTransactionFiber, connection);
    this._fibers[selector] = chain;
    return chain;
  }

  public remove(dbInfo: IDbInfo) {
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    delete this._fibers[selector];
  }
}
