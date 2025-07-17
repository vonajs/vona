import type knex from 'knex';
import type { Knex } from 'knex';
import type { FunctionAny, FunctionAsync } from 'vona';
import type { ITransactionConsistencyCommitOptions, ITransactionOptions } from '../types/transaction.ts';
import type { ServiceDb } from './db_.ts';
import type { ServiceTransactionChain } from './transactionChain.ts';
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

  get transactionChain(): ServiceTransactionChain | undefined {
    return this.transactionState.getTransactionChain(this._db.info);
  }

  get inTransaction() {
    return !!this.transactionChain;
  }

  get connection(): knex.Knex.Transaction | undefined {
    return this.transactionChain?.connection;
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

  commit(cb: FunctionAny, options?: ITransactionConsistencyCommitOptions) {
    if (options?.ctxPrefer) {
      this.ctx?.commit(cb);
      return;
    }
    const chain = this.transactionChain;
    if (!chain) {
      this.ctx?.commit(cb);
    } else {
      chain.commit(cb);
    }
  }

  compensate(cb: FunctionAny) {
    const chain = this.transactionChain;
    if (chain) {
      chain.compensate(cb);
    }
  }

  private async _isolationLevelRequired<RESULT>(fn: FunctionAsync<RESULT>, options?: ITransactionOptions): Promise<RESULT> {
    let res: RESULT;
    // begin
    let chain: ServiceTransactionChain | undefined;
    if (!this.inTransaction) {
      const connection = this._db.client.connection;
      const transactionConnection = await connection.transaction(_translateTransactionOptions(options));
      chain = this.transactionState.add(this._db.info, transactionConnection);
    }
    // fn
    try {
      res = await fn();
    } catch (err) {
      if (chain) {
        await chain.doRollback();
        this.transactionState.remove(this._db.info);
      }
      throw err;
    }
    try {
      if (chain) {
        await chain.doCommit();
        this.transactionState.remove(this._db.info);
      }
    } catch (err) {
      if (chain) {
        await chain.doRollback();
        this.transactionState.remove(this._db.info);
      }
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
