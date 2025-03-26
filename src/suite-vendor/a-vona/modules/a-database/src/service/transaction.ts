import type knex from 'knex';
import type { Knex } from 'knex';
import type { FunctionAsync } from 'vona';
import type { ITransactionOptions } from '../types/transaction.ts';
import type { ServiceDbMeta } from './dbMeta.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { EnumTransactionPropagation, TransactionIsolationLevels } from '../types/transaction.ts';

@Service()
export class ServiceTransaction extends BeanBase {
  _transactionCounter: number = 0;
  _connection?: knex.Knex.Transaction;
  _dbMeta: ServiceDbMeta;

  protected __init__(dbMeta: ServiceDbMeta) {
    this._dbMeta = dbMeta;
  }

  get inTransaction() {
    return this._transactionCounter > 0;
  }

  get connection(): knex.Knex.Transaction | undefined {
    return this._connection;
  }

  async begin<RESULT>(fn: FunctionAsync<RESULT>, options?: ITransactionOptions): Promise<RESULT> {
    let res: RESULT;
    // propagation
    const propagation = options?.propagation ?? EnumTransactionPropagation.REQUIRED;
    if (propagation === EnumTransactionPropagation.SUPPORTS) {
      // supports
    }
    // do
    try {
      if (++this._transactionCounter === 1) {
        const db = this._dbMeta.currentClient.db;
        this._connection = await db.transaction(_translateTransactionOptions(options));
      }
    } catch (err) {
      this._transactionCounter--;
      throw err;
    }
    try {
      res = await fn();
    } catch (err) {
      if (--this._transactionCounter === 0) {
        await this._connection!.rollback();
        this._connection = undefined;
      }
      throw err;
    }
    try {
      if (--this._transactionCounter === 0) {
        await this._connection!.commit();
        this._connection = undefined;
      }
    } catch (err) {
      await this._connection!.rollback();
      this._connection = undefined;
      throw err;
    }
    return res;
  }
}

function _translateTransactionOptions(options?: ITransactionOptions): Knex.TransactionConfig | undefined {
  if (!options) return undefined;
  return {
    isolationLevel: TransactionIsolationLevels[options.isolationLevel ?? 0] as any,
    readOnly: options.readOnly,
  };
}
