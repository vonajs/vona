import moment from 'moment';
import chalk from 'chalk';
import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import { LocalClient } from 'cabloy-module-api-a-database';

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

  async __fetchDatabases(client: LocalClient) {
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

  async __createDatabase() {
    // create
    const mysql = this.app.mysql.get('__ebdb');
    const databaseName = `${dbPrefix}-${moment().format('YYYYMMDD-HHmmss')}`;
    await mysql.query(`CREATE DATABASE \`${databaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    return databaseName;
  }

  async __database() {
    if (this.app.meta.isProd) {
      // donothing
      return;
    }
    // client
    const client = this.app.bean.database.getClient();
    // dev/debug db
    if (this.app.meta.isLocal) {
      // if enable testDatabase
      const enableTestDatabase = this.configDatabase.testDatabase;
      // get current database name
      let databaseName = client.getDatabaseName();
      const isTestDatabase = databaseName.indexOf(this.databasePrefix) === 0;
      // check
      if (!enableTestDatabase || isTestDatabase) {
        // donothing
        return;
      }
      const dbs = await this.__fetchDatabases(client);
      if (dbs.length === 0) {
        databaseName = await this.__createDatabase();
      } else {
        databaseName = dbs[0].name;
      }
      console.log('---------name:', databaseName);
      // create test mysql
      mysqlConfig.database = databaseName;
      this.app.mysql.__ebdb_test = mysqlConfig; // database ready
      // todo: this.ctx.db = null; // reset
      console.log(chalk.cyan(`  database: ${mysqlConfig.database}, pid: ${process.pid}`));
    }
    // test db
    if (this.app.meta.isTest && !this.app.mysql.__ebdb_test) {
      // drop old databases
      const mysql = this.app.mysql.get('__ebdb');
      const dbs = await this.__fetchDatabases();
      for (const db of dbs) {
        const name = db.name;
        await mysql.query(`drop database \`${name}\``);
      }
      // create database
      const databaseName = await this.__createDatabase();
      // create test mysql
      const mysqlConfig = this.__getMysqlConfig('__ebdb');
      mysqlConfig.database = databaseName;
      this.app.mysql.__ebdb_test = mysqlConfig;
      // todo: this.ctx.db = null; // reset
      // database ready
      console.log(chalk.cyan(`  database: ${mysqlConfig.database}, pid: ${process.pid}`));
    }
    // default
    if (!this.app.mysql.__ebdb_test) {
      this.app.mysql.__ebdb_test = this.__getMysqlConfig('__ebdb');
    }
  }

  // get mysql config
  __getMysqlConfig(clientName) {
    const mysqlConfig = this.app.config.mysql.clients[clientName];
    return Object.assign({}, this.app.config.mysql.default, mysqlConfig);
  }
}
