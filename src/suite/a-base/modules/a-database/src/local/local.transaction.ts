import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import knex from 'knex';
import { BeanDatabaseClient } from '../bean/bean.databaseClient.js';

@Local()
export class LocalTransaction extends BeanBase<ScopeModule> {
  _client: BeanDatabaseClient;
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

  protected __init__(client: BeanDatabaseClient) {
    this._client = client;
  }

  async begin(fn) {
    let res;
    try {
      if (++this._transactionCounter === 1) {
        this._connection = await this._client.beginTransaction();
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
