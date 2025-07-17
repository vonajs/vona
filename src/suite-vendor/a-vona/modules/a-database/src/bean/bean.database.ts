import type { FunctionAsync } from 'vona';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from '../service/databaseClient.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  get current() {
    return this.scope.service.databaseAsyncLocalStorage.current;
  }

  getClient(dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    const selector = this.scope.service.database.prepareClientNameSelector(dbInfo);
    return this.app.bean._getBeanSelector(
      ServiceDatabaseClient,
      selector,
      clientConfig,
    );
  }

  getDb(dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    return this.getClient(dbInfoOrClientName, clientConfig).db;
  }

  async switchDbIsolate<RESULT>(fn: FunctionAsync<RESULT>, dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord): Promise<RESULT> {
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    return this.switchDb(fn, { level: dbInfo.level + 1, clientName: dbInfo.clientName });
  }

  async switchDb<RESULT>(fn: FunctionAsync<RESULT>, dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord): Promise<RESULT> {
    const current = this.bean.database.current;
    const dbInfo = this.scope.service.database.prepareDbInfo(dbInfoOrClientName);
    if (dbInfo.level === current?.level && dbInfo.clientName === current?.clientName) {
      return fn();
    }
    const db = this.getDb(dbInfo);
    return this.scope.service.databaseAsyncLocalStorage.run(db, () => {
      return this.scope.service.transactionAsyncLocalStorage.run(fn);
    });
  }
}
