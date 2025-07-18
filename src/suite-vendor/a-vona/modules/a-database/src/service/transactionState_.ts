import type knex from 'knex';
import type { IDbInfo } from '../types/index.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceDatabase } from './database.ts';
import { ServiceTransactionFiber } from './transactionFiber_.ts';

@Service()
export class ServiceTransactionState extends BeanBase {
  private _fibers: Record<string, ServiceTransactionFiber> = {};

  private get serviceDatabase() {
    return this.bean._getBean(ServiceDatabase);
  }

  public get(dbInfo: IDbInfo): ServiceTransactionFiber | undefined {
    const selector = this.serviceDatabase.prepareClientNameSelector(dbInfo);
    return this._fibers[selector];
  }

  public add(dbInfo: IDbInfo, connection: knex.Knex.Transaction) {
    const selector = this.serviceDatabase.prepareClientNameSelector(dbInfo);
    const fiber = this.bean._newBean(ServiceTransactionFiber, connection);
    this._fibers[selector] = fiber;
    return fiber;
  }

  public remove(dbInfo: IDbInfo) {
    const selector = this.serviceDatabase.prepareClientNameSelector(dbInfo);
    delete this._fibers[selector];
  }
}
