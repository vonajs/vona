import type { FunctionAsync } from 'vona';
import type { IDbInfo } from '../types/database.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

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
    const level = dbInfo?.level ?? current?.level ?? 1; // 0 for outer users
    const clientName = this.scope.service.database.prepareClientName(
      dbInfo?.clientName ?? current?.clientName ?? this.app.config.database.defaultClient,
    ); // dbInfo.clientName maybe 'default'
    if (level === current?.level && clientName === current?.clientName) {
      return fn();
    }
    const db = this.scope.service.database.createDbMeta({ level, clientName });
    return this.scope.service.databaseAsyncLocalStorage.run(db, fn);
  }
}
