import type { FunctionAny } from 'vona';
import type { BeanDatabaseDialectBase } from 'vona-module-a-database';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import type { ITransactionConsistencyCommitOptions } from '../types/transaction.ts';
import type { ServiceDatabaseClient } from './databaseClient.ts';
import { BeanBase } from 'vona';
import { ServiceColumns } from 'vona-module-a-database';
import { Service } from 'vona-module-a-web';
import { ServiceTransaction } from './transaction.ts';
import { ServiceTransactionConsistency‌ } from './transactionConsistency‌.ts';

@Service()
export class ServiceDbMeta extends BeanBase {
  private _level: number;
  private _clientName: keyof IDatabaseClientRecord;
  private _client: ServiceDatabaseClient;
  private _columns: ServiceColumns;
  private _transaction: ServiceTransaction;
  private _transactionConsistency: ServiceTransactionConsistency‌;

  protected __init__(dbInfo?: IDbInfo, client?: ServiceDatabaseClient) {
    if (client) {
      this._client = client;
      this._clientName = client.clientName;
      this._level = client.level;
    } else {
      this._level = dbInfo?.level ?? this.bean.database.current?.level ?? 1; // 0 for outer users
      this._clientName = dbInfo?.clientName ?? this.bean.database.current?.clientName ?? this.app.config.database.defaultClient;
    }
  }

  get level() {
    return this._level;
  }

  get clientName() {
    return this._clientName;
  }

  get client() {
    if (!this._client) {
      this._client = this.app.bean.database.getClient(this.level, this.clientName);
    }
    return this._client;
  }

  get columns() {
    if (!this._columns) {
      this._columns = this.app.bean._newBean(ServiceColumns, this);
    }
    return this._columns;
  }

  get transaction() {
    if (!this._transaction) {
      this._transaction = this.app.bean._newBean(ServiceTransaction, this);
    }
    return this._transaction;
  }

  get transactionConsistency() {
    if (!this._transactionConsistency) {
      this._transactionConsistency = this.app.bean._newBean(ServiceTransactionConsistency‌);
    }
    return this._transactionConsistency;
  }

  get inTransaction() {
    return this.transaction.inTransaction;
  }

  get connection() {
    return this.inTransaction ? this.transaction.connection! : this.client.connection;
  }

  get dialectName(): keyof IDatabaseClientDialectRecord {
    return this.client.clientConfig.client;
  }

  get dialect(): BeanDatabaseDialectBase {
    return this.app.bean.database.getDialect(this.dialectName);
  }

  commit(cb: FunctionAny, options?: ITransactionConsistencyCommitOptions) {
    if (options?.ctxPrefer || !this.transaction.inTransaction) {
      this.transactionConsistency.commit(cb);
    } else {
      this.transaction.commit(cb);
    }
  }

  compensate(cb: FunctionAny) {
    if (this.transaction.inTransaction) {
      this.transaction.compensate(cb);
    }
  }

  async commitDone() {
    await this.transactionConsistency.commitDone();
  }
}
