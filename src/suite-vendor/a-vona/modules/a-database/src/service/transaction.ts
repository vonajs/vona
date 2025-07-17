import type knex from 'knex';
import type { Knex } from 'knex';
import type { FunctionAny, FunctionAsync } from 'vona';
import type { ITransactionOptions } from '../types/transaction.ts';
import type { ServiceDb } from './db.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { TransactionIsolationLevelsMap } from '../types/transaction.ts';

@Service()
export class ServiceTransaction extends BeanBase {
  private _db: ServiceDb;

  protected __init__(db: ServiceDb) {
    this._db = db;
  }

  get transactionState() {
    return this.scope.service.transactionAsyncLocalStorage.transactionState;
  }

  get inTransaction() {
    return this._transactionCounter > 0;
  }

  get connection(): knex.Knex.Transaction | undefined {
    return this._connection;
  }

  async begin<RESULT>(fn: FunctionAsync<RESULT>, options?: ITransactionOptions): Promise<RESULT> {
    // transactionOptions
    const transactionOptions = Object.assign({}, options, { propagation: undefined });
    // propagation
    const propagation = options?.propagation ?? 'REQUIRED';
    if (propagation === 'REQUIRED') {
      // required
      return this._isolationLevelRequired(fn, transactionOptions);
    } else if (propagation === 'SUPPORTS') {
      // supports
      if (this.inTransaction) {
        return this._isolationLevelRequired(fn, transactionOptions);
      } else {
        return fn();
      }
    } else if (propagation === 'MANDATORY') {
      // mandatory
      if (this.inTransaction) {
        return this._isolationLevelRequired(fn, transactionOptions);
      } else {
        throw new Error('transaction error: EnumTransactionPropagation.MANDATORY');
      }
    } else if (propagation === 'REQUIRES_NEW') {
      // requires_new
      if (!this.inTransaction) {
        return this._isolationLevelRequired(fn, transactionOptions);
      } else {
        return this.bean.database.switchDbIsolate(() => {
          return this.bean.database.current.transaction.begin(() => {
            return fn();
          }, transactionOptions);
        }, this._db.info);
      }
    } else if (propagation === 'NOT_SUPPORTED') {
      if (!this.inTransaction) {
        return fn();
      } else {
        return this.bean.database.switchDbIsolate(fn, this._db.info);
      }
    } else if (propagation === 'NEVER') {
      if (!this.inTransaction) {
        return fn();
      } else {
        throw new Error('transaction error: EnumTransactionPropagation.NEVER');
      }
    }
    throw new Error('transaction error: unknown propagation');
  }

  commit(cb: FunctionAny) {
    this._transactionConsistency.commit(cb);
  }

  compensate(cb: FunctionAny) {
    this._transactionConsistency.compensate(cb);
  }

  private async _commitDone() {
    await this._transactionConsistency.commitDone();
  }

  private async _compensateDone() {
    await this._transactionConsistency.compensateDone();
  }

  private async _isolationLevelRequired<RESULT>(fn: FunctionAsync<RESULT>, options?: ITransactionOptions): Promise<RESULT> {
    let res: RESULT;
    try {
      if (++this._transactionCounter === 1) {
        const connection = this._db.client.connection;
        this._connection = await connection.transaction(_translateTransactionOptions(options));
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
        await this._compensateDone();
        this._connection = undefined;
      }
      throw err;
    }
    try {
      if (--this._transactionCounter === 0) {
        await this._connection!.commit();
        await this._commitDone();
        this._connection = undefined;
      }
    } catch (err) {
      await this._connection!.rollback();
      await this._compensateDone();
      this._connection = undefined;
      throw err;
    }
    return res;
  }
}

function _translateTransactionOptions(options?: ITransactionOptions): Knex.TransactionConfig | undefined {
  if (!options) return undefined;
  return {
    isolationLevel: TransactionIsolationLevelsMap[options.isolationLevel ?? 'DEFAULT'] as any,
    readOnly: options.readOnly,
  };
}
