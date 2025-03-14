import type knex from 'knex';
import type { FunctionAsync } from 'vona';
import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceTransaction extends BeanBase {
  _transactionCounter: number = 0;
  _connection?: knex.Knex.Transaction;
  _db?: knex.Knex;

  get inTransaction() {
    return this._transactionCounter > 0;
  }

  get connection(): knex.Knex.Transaction | undefined {
    return this._connection;
  }

  get db(): knex.Knex | undefined {
    return this._db;
  }

  async begin<RESULT>(fn: FunctionAsync<RESULT>, options?: Partial<IMiddlewareOptionsTransaction>): Promise<RESULT> {
    let res: RESULT;
    if (!this._db) {
      this._db = this.app.bean.database.getDefault();
    }
    try {
      if (++this._transactionCounter === 1) {
        this._connection = await this._db.transaction(options);
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
        this._db = undefined;
      }
      throw err;
    }
    try {
      if (--this._transactionCounter === 0) {
        await this._connection!.commit();
        this._connection = undefined;
        this._db = undefined;
      }
    } catch (err) {
      await this._connection!.rollback();
      this._connection = undefined;
      this._db = undefined;
      throw err;
    }
    return res;
  }
}
