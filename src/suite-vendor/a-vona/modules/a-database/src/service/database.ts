import type { BeanDatabaseDialectBase } from '../bean/bean.databaseDialectBase.ts';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceDatabase extends BeanBase {
  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    if (!client) throw new Error('database dialect not specified');
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) throw new Error(`database dialect not found: ${client}`);
    return dialect;
  }

  prepareDbInfo(dbInfoOrClientName?: Partial<IDbInfo> | keyof IDatabaseClientRecord): IDbInfo {
    let level;
    let clientName;
    if (typeof dbInfoOrClientName === 'string') {
      level = undefined;
      clientName = dbInfoOrClientName;
    } else {
      level = dbInfoOrClientName?.level;
      clientName = dbInfoOrClientName?.clientName;
    }
    // check if selector
    if (clientName && clientName.includes(':')) return clientName;
    // check if default
    clientName = this.prepareClientName(clientName);
    // level
    level = level ?? this.bean.database.current?.level ?? 0;
    return { level, clientName };
  }

  prepareClientNameSelector(dbInfo: IDbInfo) {
    // combine
    return dbInfo.level === 0 ? dbInfo.clientName : `${dbInfo.clientName}:${dbInfo.level}`;
  }

  parseClientNameSelector(clientNameSelector: string): IDbInfo {
    if (isNil(clientNameSelector)) throw new Error('invalid clientNameSelector');
    const [clientName, level] = clientNameSelector.split(':');
    if (!clientName) throw new Error('clientName must be specified');
    return {
      level: Number(level ?? 0),
      clientName: clientName as keyof IDatabaseClientRecord,
    };
  }

  prepareClientName(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return (!clientName || clientName === 'default') ? this.app.config.database.defaultClient : clientName;
  }

  prepareClientNameReal(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.scope.event.clientNameReal.emitSync(this.prepareClientName(clientName), clientName => {
      return clientName;
    });
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
