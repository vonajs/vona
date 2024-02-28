import moment from 'moment';
import chalk from 'chalk';
import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import { BeanDatabaseClient } from 'cabloy-module-api-a-database';

@Local()
export class LocalDatabase extends BeanBase<ScopeModule> {
  get configDatabase() {
    return this.app.config.database;
  }

  get databasePrefix() {
    return `cabloy-test-${this.app.name}`;
  }

  async databaseInitStartup() {
    // database
    await this.__database();
    // version start
    await this.scope.local.version.__start();
  }

  async databaseNameStartup() {
    // database
    await this.__database();
  }

  async __fetchDatabases(client: BeanDatabaseClient) {
    // dbs
    let dbs = await client.fetchDatabases(this.databasePrefix);
    // filter
    dbs = dbs.filter(db => {
      const _time = db.name.substring(this.databasePrefix.length);
      return _time.length === 16;
    });
    // ok
    return dbs;
  }

  async __createDatabase(client: BeanDatabaseClient) {
    // create
    const databaseName = `${this.databasePrefix}-${moment().format('YYYYMMDD-HHmmss')}`;
    await client.createDatabase(databaseName);
    return databaseName;
  }

  async __database() {
    if (this.app.meta.isProd) {
      // donothing
      return;
    }
    // client
    const client = this.app.bean.database.getClient();
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
      console.log(chalk.cyan(`  database: ${databaseName}, pid: ${process.pid}`));
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
        await client.dropDatabase(db.name);
      }
      // create database
      const databaseName = await this.__createDatabase(client);
      // set config and reload client
      await client.changeConfigAndReload(databaseName);
      // database ready
      console.log(chalk.cyan(`  database: ${databaseName}, pid: ${process.pid}`));
    }
  }
}
