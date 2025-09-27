import type { BeanDatabaseDialectBase } from '../bean/bean.databaseDialectBase.ts';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDbInfo } from '../types/database.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from './databaseClient_.ts';

@Service()
export class ServiceDatabase extends BeanBase {
  get configDatabase() {
    return this.app.config.database;
  }

  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    if (!client) throw new Error('database dialect not specified');
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) throw new Error(`database dialect not found: ${client}`);
    return dialect;
  }

  getClientConfig(clientName: keyof IDatabaseClientRecord, original: boolean = false): ConfigDatabaseClient {
    // clientConfig
    let clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    // check
    if (!clientConfig) {
      throw new Error(`database config not found: ${clientName}`);
    }
    // configBaseClient
    const dialect = this.scope.service.database.getDialect(clientConfig.client);
    const configBaseClient = dialect.getConfigBase();
    // combine
    const configBase = this.configDatabase.base;
    clientConfig = deepExtend({}, configBase, configBaseClient, clientConfig);
    // ready
    return clientConfig;
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
    clientName = this.prepareClientName(clientName ?? this.bean.database.current?.clientName);
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
    return (!clientName || clientName === 'default') ? this.getDefaultClientName() : clientName;
  }

  getDefaultClientName(): keyof IDatabaseClientRecord {
    const defaultClient = this.app.config.database.defaultClient;
    if (typeof defaultClient === 'function') {
      return defaultClient(this.ctx);
    }
    // check instance
    if (!isNil(this.ctx.instanceName)) {
      const configInstanceBase = this.$scope.instance.service.instance.getConfigInstanceBase(this.ctx.instanceName);
      if (configInstanceBase?.isolate) {
        return configInstanceBase.isolateClient!;
      }
    }
    return defaultClient;
  }

  prepareClientNameReal(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.scope.event.clientNameReal.emitSync(this.prepareClientName(clientName), clientName => {
      return clientName;
    });
  }

  columnsClear(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.columnsClearWorker(clientName, tableName);
    this.scope.broadcast.columnsClear.emit({ clientName, tableName });
  }

  private columnsClearWorker(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.scope.event.columnsClear.emitSync({ clientName: this.prepareClientNameReal(clientName), tableName });
  }

  async reloadClients(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    clientName = this.prepareClientName(clientName);
    await this.bean.mutate.reloadInstances(ServiceDatabaseClient, { clientName, clientConfig });
    this.columnsClear(clientName);
  }

  async disposeClients(clientName?: keyof IDatabaseClientRecord) {
    clientName = this.prepareClientName(clientName);
    await this.bean.mutate.disposeInstances(ServiceDatabaseClient, { clientName });
    this.columnsClear(clientName);
  }
}
