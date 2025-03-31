import type { ServiceDatabaseClient } from 'vona-module-a-database';
import chalk from 'chalk';
import moment from 'moment';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const __separator = '-';
const __timeFormat = `YYYYMMDD${__separator}HHmmss`;

@Service()
export class ServiceDatabase extends BeanBase {
  get configDatabase() {
    return this.app.config.database;
  }

  get databasePrefix() {
    return `cabloy${__separator}test${__separator}${this.app.name}${__separator}`;
  }

  async databaseInitStartup() {
    // database
    await this.__database();
    // version start
    await this.scope.service.version.__start();
  }

  async databaseNameStartup() {
    // database
    await this.__database();
  }

  async __fetchDatabases(client: ServiceDatabaseClient) {
    // dbs
    let dbs = await client.connection.schema.fetchDatabases(this.databasePrefix);
    // filter
    dbs = dbs.filter(db => {
      const _time = db.name.substring(this.databasePrefix.length);
      return _time.length === __timeFormat.length;
    });
    // ok
    return dbs;
  }

  async __createDatabase(client: ServiceDatabaseClient) {
    // create
    const databaseName = `${this.databasePrefix}${moment().format(__timeFormat)}`;
    await client.connection.schema.createDatabase(databaseName);
    return databaseName;
  }

  async __database() {
    if (this.app.meta.isProd) {
      // donothing
      return;
    }
    // client
    const client = this.bean.database.getClientDefault();
    // get current database name
    let databaseName = client.getDatabaseName();
    const isTestDatabase = databaseName.indexOf(this.databasePrefix) === 0;
    // dev/debug db
    if (this.app.meta.isLocal) {
      // if enable testDatabase
      const enableTestDatabase = this.configDatabase.testDatabase;
      // check
      if (!enableTestDatabase || isTestDatabase) {
        // donothing
        return;
      }
      const dbs = await this.__fetchDatabases(client);
      if (dbs.length === 0) {
        databaseName = await this.__createDatabase(client);
      } else {
        databaseName = dbs[0].name;
      }
      // set config and reload client
      await client.changeConfigAndReload(databaseName);
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
      const dbs = await this.__fetchDatabases(client);
      for (const db of dbs) {
        await client.connection.schema.dropDatabase(db.name);
      }
      // create database
      const databaseName = await this.__createDatabase(client);
      // set config and reload client
      await client.changeConfigAndReload(databaseName);
      // database ready
      this.$logger.silly(chalk.cyan(`database: ${databaseName}, pid: ${process.pid}`));
    }
  }
}
