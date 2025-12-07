import type { FunctionAsync } from 'vona';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseAsyncLocalStorage } from '../service/databaseAsyncLocalStorage_.ts';
import { ServiceDatabaseClient } from '../service/databaseClient_.ts';
import { ServiceTransactionAsyncLocalStorage } from '../service/transactionAsyncLocalStorage_.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  get current() {
    return this.bean._getBean(ServiceDatabaseAsyncLocalStorage).current;
  }

  getClient(dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    const clientConfigReal = this._prepareClientConfig(dbInfo.clientName, clientConfig);
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo, clientConfigReal.client);
    return this.app.bean._getBeanSelector(
      ServiceDatabaseClient,
      selector,
      clientConfigReal,
    );
  }

  getDb(dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    return this.getClient(dbInfoOrClientName, clientConfig).db;
  }

  async switchDbIsolate<RESULT>(fn: FunctionAsync<RESULT>, dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord): Promise<RESULT> {
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    // const level = this.app.config.database.defaultClient === 'sqlite3' ? dbInfo.level : dbInfo.level + 1;
    const level = dbInfo.level + 1;
    return this.switchDb(fn, { level, clientName: dbInfo.clientName });
  }

  async switchDb<RESULT>(fn: FunctionAsync<RESULT>, dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord): Promise<RESULT> {
    const current = this.bean.database.current;
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    if (dbInfo.level === current?.level && dbInfo.clientName === current?.clientName) {
      return fn();
    }
    const db = this.getDb(dbInfo);
    return this.bean._getBean(ServiceDatabaseAsyncLocalStorage).run(db, () => {
      return this.bean._getBean(ServiceTransactionAsyncLocalStorage).run(fn);
    });
  }

  // only for bean.database.getClient
  private _prepareClientConfig(clientName: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient): ConfigDatabaseClient {
    return clientConfig ? deepExtend({}, clientConfig) : this.scope.service.database.getClientConfig(clientName);
  }
}
