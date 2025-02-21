import type knex from 'knex';
import type { FunctionAsync } from 'vona';
import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceTransaction extends BeanBase {
  _transactionCounter: number = 0;
  _connection: knex.Knex.Transaction | null = null;

  get inTransaction() {
    return this._transactionCounter > 0;
  }

  get connection(): knex.Knex.Transaction | null {
    return this._connection;
  }

  set connection(value: knex.Knex.Transaction | null) {
    this._connection = value;
  }

  async begin<RESULT>(fn: FunctionAsync<RESULT>, options?: Partial<IMiddlewareOptionsTransaction>): Promise<RESULT> {
    let res: RESULT;
    const db = this.app.bean.database.getDefault();
    try {
      if (++this._transactionCounter === 1) {
        this._connection = await db.transaction(options);
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
        this._connection = null;
      }
      throw err;
    }
    try {
      if (--this._transactionCounter === 0) {
        await this._connection!.commit();
        this._connection = null;
      }
    } catch (err) {
      await this._connection!.rollback();
      this._connection = null;
      throw err;
    }
    return res;
  }
}
