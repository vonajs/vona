import type knex from 'knex';
import type { ServiceDb } from './db_.ts';
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

  public get(db: ServiceDb): ServiceTransactionFiber | undefined {
    const selector = this.serviceDatabase.prepareClientNameSelector(db.info, db.dialectName);
    return this._fibers[selector];
  }

  public add(db: ServiceDb, connection: knex.Knex.Transaction) {
    const selector = this.serviceDatabase.prepareClientNameSelector(db.info, db.dialectName);
    const fiber = this.bean._newBean(ServiceTransactionFiber, connection);
    this._fibers[selector] = fiber;
    return fiber;
  }

  public remove(db: ServiceDb) {
    const selector = this.serviceDatabase.prepareClientNameSelector(db.info, db.dialectName);
    delete this._fibers[selector];
  }
}
