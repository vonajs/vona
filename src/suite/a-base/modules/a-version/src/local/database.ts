import moment from 'moment';
import chalk from 'chalk';
import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalDatabase extends BeanBase<ScopeModule> {
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

  __getDatabasePrefix() {
    return `egg-born-test-${this.app.name}`;
  }

  async __fetchDatabases() {
    // db prefix
    const dbPrefix = this.__getDatabasePrefix();
    // dbs
    const mysql = this.app.mysql.get('__ebdb');
    let dbs = await mysql.query(`show databases like \'${dbPrefix}-%\'`);
    // map
    dbs = dbs.map(db => {
      const name = db[Object.keys(db)[0]];
      return { name };
    });
    // filter
    dbs = dbs.filter(db => {
      const _time = db.name.substring(dbPrefix.length);
      return _time.length === 16;
    });
    // ok
    return dbs;
  }

  async __createDatabase() {
    // db prefix
    const dbPrefix = this.__getDatabasePrefix();
    // create
    const mysql = this.app.mysql.get('__ebdb');
    const databaseName = `${dbPrefix}-${moment().format('YYYYMMDD-HHmmss')}`;
    await mysql.query(`CREATE DATABASE \`${databaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    return databaseName;
  }

  async __database() {
    // dev/debug db
    if (this.app.meta.isLocal) {
      const mysqlConfig = this.__getMysqlConfig('__ebdb');
      if ((mysqlConfig.database === 'sys' || mysqlConfig.database === 'mysql') && !this.app.mysql.__ebdb_test) {
        let databaseName;
        const dbs = await this.__fetchDatabases();
        if (dbs.length === 0) {
          databaseName = await this.__createDatabase();
        } else {
          const db = dbs[0];
          databaseName = db.name;
        }
        // create test mysql
        mysqlConfig.database = databaseName;
        this.app.mysql.__ebdb_test = mysqlConfig; // database ready
        // todo: this.ctx.db = null; // reset
        console.log(chalk.cyan(`  database: ${mysqlConfig.database}, pid: ${process.pid}`));
      }
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
