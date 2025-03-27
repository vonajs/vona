import type knex from 'knex';
import type { Knex } from 'knex';
import type { FunctionAny, FunctionAsync } from 'vona';
import type { ITransactionOptions } from '../types/transaction.ts';
import type { ServiceDbMeta } from './dbMeta.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { EnumTransactionPropagation, TransactionIsolationLevels } from '../types/transaction.ts';
import { ServiceTransactionConsistency‌ } from './transactionConsistency‌.ts';

@Service()
export class ServiceTransaction extends BeanBase {
  private _transactionCounter: number = 0;
  private _connection?: knex.Knex.Transaction;
  private _dbMeta: ServiceDbMeta;
  private _transactionConsistency: ServiceTransactionConsistency‌;

  protected __init__(dbMeta: ServiceDbMeta) {
    this._dbMeta = dbMeta;
    this._transactionConsistency = this.app.bean._newBean(ServiceTransactionConsistency‌);
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
          dbClientName: this._dbMeta.currentClientName,
          transaction: true,
          transactionOptions,
        });
      }
    } else if (propagation === EnumTransactionPropagation.NOT_SUPPORTED) {
      if (!this.inTransaction) {
        return await fn();
      } else {
        return await this.bean.executor.newCtxIsolate(fn, {
          dbClientName: this._dbMeta.currentClientName,
        });
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
    isolationLevel: TransactionIsolationLevels[options.isolationLevel ?? 0] as any,
    readOnly: options.readOnly,
  };
}
