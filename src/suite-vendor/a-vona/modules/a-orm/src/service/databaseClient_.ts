import type { Knex } from 'knex';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import knex from 'knex';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';
import { BeanMutateBase } from 'vona-module-a-beanmutate';
import { ServiceDb } from './db_.ts';

export interface IPrepareDatabaseNameResult { database?: string; filename?: string }

@Service()
export class ServiceDatabaseClient extends BeanMutateBase {
  level: number;
  clientName: keyof IDatabaseClientRecord;
  clientNameSelector: string;
  clientConfig: ConfigDatabaseClient;
  private _knex: Knex;
  private _db: ServiceDb;

  get configDatabase() {
    return this.app.config.database;
  }

  get connection(): Knex {
    return this._knex;
  }

  get db(): ServiceDb {
    return this._db;
  }

  protected __init__(clientNameSelector?: string, clientConfig?: ConfigDatabaseClient) {
    super.__init__();
    // db
    this._db = this.bean._newBean(ServiceDb, this);
    // load
    this.__load(clientNameSelector!, clientConfig);
    // event: databaseClientReload
    this._onDatabaseClientReloadCancel = this.scope.event.databaseClientReload.on(async ({ clientName, clientConfig }, next) => {
      if (clientName === this.clientName) {
        await this.reload(clientConfig);
      }
      await next();
    });
    // event: databaseClientDispose
    this._onDatabaseClientDisposeCancel = this.scope.event.databaseClientDispose.on(async ({ clientName }, next) => {
      if (clientName === this.clientName) {
        await this.bean.disposeInstance(this.$beanInstanceKey);
      }
      await next();
    });
  }

  protected async __dispose__() {
    super.__dispose__();
    this._db = undefined as any;
    await this.__close();
  }

  protected async onReloadInstance({ clientName, clientConfig }) {
    if (clientName === this.clientName) {
      await this.reload(clientConfig);
    }
  }

  protected async onDisposeInstance({ clientName }) {
    if (clientName === this.clientName) {
      await super.onDisposeInstance({ clientName });
    }
  }

  private __load(clientNameSelector: string, clientConfig?: ConfigDatabaseClient) {
    // name
    this.clientNameSelector = clientNameSelector;
    const dbInfo = this.scope.service.database.parseClientNameSelector(clientNameSelector);
    this.level = dbInfo.level;
    this.clientName = dbInfo.clientName;
    // config
    this.clientConfig = clientConfig ? deepExtend({}, clientConfig) : this.scope.service.database.getClientConfig(this.clientName);
    this.$loggerChild('database').debug('clientName: %s, clientConfig: %j', this.clientName, this.clientConfig);
    // knex
    this._knex = knex(this.clientConfig);
  }

  private async __close() {
    if (this._knex) {
      await this._knex.destroy();
      this._knex = undefined as any;
    }
  }

  async reload(clientConfig?: ConfigDatabaseClient) {
    await this.__close();
    this.__load(this.clientNameSelector, clientConfig);
  }

  getDatabaseName(): string {
    const connection = this.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  private _prepareDatabaseName(databaseName: string): IPrepareDatabaseNameResult {
    const result: IPrepareDatabaseNameResult = {};
    const connection = this.clientConfig.connection as any;
    if (connection.database) {
      result.database = databaseName;
    } else if (connection.filename) {
      result.filename = databaseName;
    }
    return result;
  }

  // only used by startup, so no consider that workers broadcast
  async changeConfigConnectionAndReload(databaseName: string): Promise<void> {
    // set databaseName
    const connDatabaseName = this._prepareDatabaseName(databaseName);
    // set config
    //   * should not use this.clientConfig.connection, because password is hidden
    const config = this.scope.service.database.getClientConfig(this.clientName, true);
    config.connection = Object.assign({}, config.connection, connDatabaseName);
    // only used by startup, so no consider that workers broadcast
    this.configDatabase.clients[this.clientName] = config;
    // reload
    await this.scope.service.database.reloadClientsRaw(this.clientName, config);
    // await this.scope.service.database.reloadClients(this.clientName, config);
  }
}
