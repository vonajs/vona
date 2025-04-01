import type { FunctionAsync } from 'vona';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDatabaseSwitchOptions, IDbInfo } from '../types/database.ts';
import type { BeanDatabaseDialectBase } from './bean.databaseDialectBase.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from '../service/databaseClient.ts';
import { ServiceDbMeta } from '../service/dbMeta.ts';

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
    const clientName = this.prepareClientName(dbInfo?.clientName ?? current?.clientName ?? this.app.config.database.defaultClient); // dbInfo.clientName maybe 'default'
    if (level === current?.level && clientName === current?.clientName) {
      return fn();
    }
    const db = this.createDbMeta({ level, clientName });
    return this.scope.service.databaseAsyncLocalStorage.run(db, fn);
  }

  columnsClear(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.__columnsClearRaw(clientName, tableName);
    this.scope.broadcast.columnsClear.emit({ clientName, tableName });
  }

  __columnsClearRaw(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.scope.event.columnsClear.emitSync({ clientName: this.prepareClientNameReal(clientName), tableName });
  }

  async reloadClients(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient, extraData?: any) {
    await this.__reloadAllClientsRaw(clientName, clientConfig, extraData);
    this.scope.broadcast.databaseClientReload.emit({ clientName, clientConfig, extraData });
  }

  private async __reloadAllClientsRaw(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient, extraData?: any) {
    await this.scope.event.databaseClientReload.emit({ clientName: this.prepareClientName(clientName), clientConfig, extraData });
    this.__columnsClearRaw(clientName);
  }
}
