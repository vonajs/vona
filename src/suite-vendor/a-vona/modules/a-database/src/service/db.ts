import type { FunctionAny } from 'vona';
import type { BeanDatabaseDialectBase } from 'vona-module-a-database';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import type { ITransactionConsistencyCommitOptions } from '../types/transaction.ts';
import type { ServiceDatabaseClient } from './databaseClient.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceColumns } from 'vona-module-a-database';
import { ServiceTransaction } from './transaction.ts';

@Service()
export class ServiceDb extends BeanBase {
  private _level: number;
  private _clientName: keyof IDatabaseClientRecord;
  private _client: ServiceDatabaseClient;
  private _columns: ServiceColumns;
  private _transaction: ServiceTransaction;

  protected __init__(dbInfo?: IDbInfo, client?: ServiceDatabaseClient) {
    if (client) {
      this._client = client;
      this._clientName = client.clientName;
      this._level = client.level;
    } else {
      const dbInfo2 = this.scope.service.database.prepareDbInfo(dbInfo);
      this._level = dbInfo2.level;
      this._clientName = dbInfo2.clientName;
    }
  }

  get info(): IDbInfo {
    return { level: this.level, clientName: this.clientName };
  }

  get level() {
    return this._level;
  }

  get clientName() {
    return this._clientName;
  }

  get client() {
    if (!this._client) {
      this._client = this.scope.service.database.getClient({ level: this.level, clientName: this.clientName });
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
    return this.scope.service.database.getDialect(this.dialectName);
  }

  commit(cb: FunctionAny, options?: ITransactionConsistencyCommitOptions) {
    if (options?.ctxPrefer || !this.transaction.inTransaction) {
      this.ctx?.commit(cb);
    } else {
      this.transaction.commit(cb);
    }
  }

  compensate(cb: FunctionAny) {
    if (this.transaction.inTransaction) {
      this.transaction.compensate(cb);
    }
  }
}
