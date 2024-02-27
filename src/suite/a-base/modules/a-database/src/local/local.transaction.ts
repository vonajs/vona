import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import knex from 'knex';

@Local()
export class LocalTransaction extends BeanBase<ScopeModule> {
  _transactionCounter: number = 0;
  _connection: knex.Knex.Transaction | null = null;

  get inTransaction() {
    return this._transactionCounter > 0;
  }

  get connection() {
    return this._connection;
  }

  set connection(value: knex.Knex.Transaction) {
    this._connection = value;
  }

  async begin(fn) {
    let res;
    const db = this.ctx.bean.database.getDbOriginal();
    try {
      if (++this._transactionCounter === 1) {
        this._connection = await db.transaction({ isolationLevel: 'read committed' });
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
