import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, ITableColumn, VirtualDatabaseDialect } from './virtual.databaseDialect.js';
import { Knex } from 'knex';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql extends VirtualDatabaseDialect {
  async fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    const res = await this.schemaBuilder.raw(`show databases like '${databasePrefix}%'`);
    let dbs = res[0];
    dbs = dbs.map(db => {
      const name = db[Object.keys(db)[0]];
      return { name };
    });
    return dbs;
  }

  async createDatabase(databaseName: string): Promise<void> {
    await this.schemaBuilder.raw(
      `CREATE DATABASE \`${databaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  async dropDatabase(databaseName: string): Promise<void> {
    await this.schemaBuilder.raw(`drop database \`${databaseName}\``);
  }

  coerceColumn(column: Knex.ColumnInfo): ITableColumn {
    this.ctx.db.client.config.client;
    const result: ITableColumn = {};
    let type = column.type;
    const defaultValue = column.defaultValue;
    const pos = type.indexOf('(');
    if (pos > -1) type = type.substring(0, pos);
    // default value
    const value = column.Default;
    // coerce
    if (value === null) return value;
    if (['timestamp'].includes(type) && value === 'CURRENT_TIMESTAMP') return new Date();
    if (['bit', 'bool'].includes(type)) return Boolean(value);
    if (['float', 'double'].includes(type)) return Number(value);
    if (['tinyint', 'smallint', 'mediumint', 'int', 'bigint'].includes(type)) return Number(value);
    // others
    return value;
  }
}
