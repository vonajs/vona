import type { ConfigInstanceBase } from 'vona-module-a-instance';
import type { IDatabaseClientRecord, ServiceDatabaseClient } from 'vona-module-a-orm';
import chalk from 'chalk';
import moment from 'moment';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

const __separator = '-';
const __timeFormat = `YYYYMMDD${__separator}HHmmss`;

@Service()
export class ServiceDatabase extends BeanBase {
  get configDatabase() {
    return this.app.config.database;
  }

  public getDatabasePrefix(configInstanceBase?: ConfigInstanceBase) {
    const instanceName = configInstanceBase?.isolate ? `isolate${__separator}${configInstanceBase.name}` : 'share';
    return `vona${__separator}test${__separator}${this.app.name}${__separator}${instanceName}${__separator}`;
  }

  public async databaseInitStartup() {
    // database
    await this.__prepareDatabases(true);
  }

  public async databaseNameStartup() {
    // database
    await this.__prepareDatabases(false);
  }

  public async prepareDatabase(clientName: keyof IDatabaseClientRecord, versionStart: boolean, configInstanceBase?: ConfigInstanceBase) {
    await this.bean.database.switchDb(async () => {
      await this.__prepareDatabase(versionStart, configInstanceBase);
    }, clientName);
  }

  private async __fetchDatabases(client: ServiceDatabaseClient, configInstanceBase?: ConfigInstanceBase) {
    const databasePrefix = this.getDatabasePrefix(configInstanceBase);
    // dbs
    let dbs = await client.connection.schema.fetchDatabases(databasePrefix);
    // filter
    dbs = dbs.filter(db => {
      const _time = db.name.substring(databasePrefix.length);
      return _time.length === __timeFormat.length;
    });
    // ok
    return dbs;
  }

  private async __createDatabase(client: ServiceDatabaseClient, configInstanceBase?: ConfigInstanceBase) {
    const databasePrefix = this.getDatabasePrefix(configInstanceBase);
    // create
    const databaseName = `${databasePrefix}${moment().format(__timeFormat)}`;
    await client.connection.schema.createDatabase(databaseName);
    return databaseName;
  }

  private async __prepareDatabases(versionStart: boolean) {
    // default
    await this.prepareDatabase('default', versionStart);
    // isolate
    for (const configInstanceBase of this.app.config.instances) {
      if (!configInstanceBase.isolate) continue;
      if (!configInstanceBase.isolateClient) throw new Error(`should specify isolateClient for isolate instance: ${configInstanceBase.name}`);
      await this.prepareDatabase(configInstanceBase.isolateClient, versionStart, configInstanceBase);
    }
  }

  private async __prepareDatabase(versionStart: boolean, configInstanceBase?: ConfigInstanceBase) {
    await this.__prepareDatabaseInner(configInstanceBase);
    if (versionStart) {
      await this.scope.service.version.__start();
    }
  }

  private async __prepareDatabaseInner(configInstanceBase?: ConfigInstanceBase) {
    if (this.app.meta.isProd) {
      // donothing
      return;
    }
    const databasePrefix = this.getDatabasePrefix(configInstanceBase);
    // client
    const client = this.bean.database.current.client;
    // get current database name
    let databaseName = client.getDatabaseName();
    const isTestDatabase = databaseName.indexOf(databasePrefix) === 0;
    // dev/debug db
    if (this.app.meta.isDev) {
      // if enable testDatabase
      const enableTestDatabase = this.configDatabase.testDatabase;
      // check
      if (!enableTestDatabase || isTestDatabase) {
        // donothing
        return;
      }
      const dbs = await this.__fetchDatabases(client, configInstanceBase);
      if (dbs.length === 0) {
        databaseName = await this.__createDatabase(client, configInstanceBase);
      } else {
        databaseName = dbs[0].name;
      }
      // set config and reload client
      await client.changeConfigConnectionAndReloadWorker(databaseName);
      this.$logger.silly(chalk.cyan(`dialect: ${client.db.dialectName}`));
      this.$logger.silly(chalk.cyan(`database: ${databaseName}, pid: ${process.pid}`));
    }
    // test db
    if (this.app.meta.isTest) {
      // check
      if (isTestDatabase) {
        // donothing
        return;
      }
      // drop old databases
      const dbs = await this.__fetchDatabases(client, configInstanceBase);
      for (const db of dbs) {
        await client.connection.schema.dropDatabase(db.name);
      }
      // create database
      const databaseName = await this.__createDatabase(client, configInstanceBase);
      // set config and reload client
      await client.changeConfigConnectionAndReloadWorker(databaseName);
      // database ready
      this.$logger.silly(chalk.cyan(`dialect: ${client.db.dialectName}`));
      this.$logger.silly(chalk.cyan(`database: ${databaseName}, pid: ${process.pid}`));
    }
  }
}
