import type { BeanDatabaseDialectBase } from '../bean/bean.databaseDialectBase.ts';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from './databaseClient.ts';

@Service()
export class ServiceDatabase extends BeanBase {
  getClient(dbInfo: IDbInfo | undefined, clientConfig?: ConfigDatabaseClient) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, this.prepareClientNameSelector(dbInfo), clientConfig);
  }

  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    if (!client) throw new Error('database dialect not specified');
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) throw new Error(`database dialect not found: ${client}`);
    return dialect;
  }

  prepareDbInfo(dbInfo?: IDbInfo) {
    const current = this.bean.database.current;
    const level = dbInfo?.level ?? current?.level ?? 1; // 0 for outer users
    const clientName = this.scope.service.database.prepareClientName(
      dbInfo?.clientName ?? current?.clientName ?? this.app.config.database.defaultClient,
    ); // dbInfo.clientName maybe 'default'
    return { level, clientName };
  }

  prepareClientNameSelector(dbInfo?: IDbInfo) {
    const level = dbInfo?.level;
    let clientName = dbInfo?.clientName as keyof IDatabaseClientRecord | string;
    // string
    if (clientName && clientName.includes(':')) return clientName;
    // keyof IDatabaseClientRecord
    clientName = this.isDefaultClientName(clientName as any) ? '' : clientName;
    if (level === undefined) throw new Error('should specify the db level');
    return level === 0 ? clientName : `${clientName}:${level}`;
  }

  parseClientNameSelector(clientNameSelector: string): Required<IDbInfo> {
    if (isNil(clientNameSelector)) throw new Error('invalid clientNameSelector');
    const [clientName, level] = clientNameSelector.split(':');
    return {
      level: Number(level ?? 0),
      clientName: clientName as keyof IDatabaseClientRecord || this.app.config.database.defaultClient,
    };
  }

  isDefaultClientName(clientName?: keyof IDatabaseClientRecord) {
    return (!clientName || clientName === 'default' || clientName === this.app.config.database.defaultClient);
  }

  prepareClientName(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.isDefaultClientName(clientName) ? this.app.config.database.defaultClient : clientName!;
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
