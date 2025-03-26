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
    // transactionOptions
    const transactionOptions = Object.assign({}, options, { propagation: undefined });
    // propagation
    const propagation = options?.propagation ?? EnumTransactionPropagation.REQUIRED;
    if (propagation === EnumTransactionPropagation.REQUIRED) {
      // required
      return await this._isolationLevelRequired(fn, transactionOptions);
    } else if (propagation === EnumTransactionPropagation.SUPPORTS) {
      // supports
      if (this.inTransaction) {
        return await this._isolationLevelRequired(fn, transactionOptions);
      } else {
        return await fn();
      }
    } else if (propagation === EnumTransactionPropagation.MANDATORY) {
      // mandatory
      if (this.inTransaction) {
        return await this._isolationLevelRequired(fn, transactionOptions);
      } else {
        throw new Error('transaction error: EnumTransactionPropagation.MANDATORY');
      }
    } else if (propagation === EnumTransactionPropagation.REQUIRES_NEW) {
      // requires_new
      if (!this.inTransaction) {
        return await this._isolationLevelRequired(fn, transactionOptions);
      } else {
        return await this.bean.executor.newCtxIsolate(fn, {
          transaction: true,
          transactionOptions,
        });
      }
    } else if (propagation === EnumTransactionPropagation.NOT_SUPPORTED) {
      if (!this.inTransaction) {
        return await fn();
      } else {
        return await this.bean.executor.newCtxIsolate(fn);
      }
    } else if (propagation === EnumTransactionPropagation.NEVER) {
      if (!this.inTransaction) {
        return await fn();
      } else {
        throw new Error('transaction error: EnumTransactionPropagation.NEVER');
      }
    }
    throw new Error('transaction error: unknown propagation');
  }

  private async _isolationLevelRequired<RESULT>(fn: FunctionAsync<RESULT>, options?: ITransactionOptions): Promise<RESULT> {
    let res: RESULT;
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
