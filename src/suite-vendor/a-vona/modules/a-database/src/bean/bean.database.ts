import type { FunctionAsync } from 'vona';
import type { ServiceDatabaseClient } from '../service/databaseClient.ts';
import type { IDbInfo } from '../types/database.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDb } from '../service/db.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  get current() {
    return this.scope.service.databaseAsyncLocalStorage.current;
  }

  async newDbIsolate<RESULT>(fn: FunctionAsync<RESULT>, dbInfo?: IDbInfo): Promise<RESULT> {
    const current = this.bean.database.current;
    if (!current) return this.newDb(fn, dbInfo);
    const level = dbInfo?.level ?? current.level + 1;
    const clientName = dbInfo?.clientName ?? current?.clientName;
    return this.newDb(fn, { level, clientName });
  }

  async newDb<RESULT>(fn: FunctionAsync<RESULT>, dbInfo?: IDbInfo): Promise<RESULT> {
    const current = this.bean.database.current;
    const dbInfo2 = this.scope.service.database.prepareDbInfo(dbInfo);
    if (dbInfo2.level === current?.level && dbInfo2.clientName === current?.clientName) {
      return fn();
    }
    const db = this.createDb(dbInfo2);
    return this.scope.service.databaseAsyncLocalStorage.run(db, fn);
  }

  createDb(dbInfo: IDbInfo): ServiceDb;
  createDb(dbInfo: undefined, client: ServiceDatabaseClient): ServiceDb;
  createDb(dbInfo?: IDbInfo, client?: ServiceDatabaseClient): ServiceDb {
    return this.app.bean._newBean(ServiceDb, dbInfo, client);
  }
}
