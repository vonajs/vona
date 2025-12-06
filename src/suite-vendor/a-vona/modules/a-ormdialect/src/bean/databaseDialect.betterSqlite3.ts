import type { Knex } from 'knex';
import type { TableIdentity } from 'table-identity';
import type { ConfigDatabaseClient, IDecoratorDatabaseDialectOptions, IFetchDatabasesResultItem, TypeGetTableColumnsFn } from 'vona-module-a-orm';
import path from 'node:path';
import { ensureDir, remove } from 'fs-extra';
import { globby } from 'globby';
import { BeanDatabaseDialectBase, DatabaseDialect } from 'vona-module-a-orm';

export interface IDatabaseDialectOptionsBetterSqlite3 extends IDecoratorDatabaseDialectOptions {}

@DatabaseDialect<IDatabaseDialectOptionsBetterSqlite3>()
export class DatabaseDialectBetterSqlite3 extends BeanDatabaseDialectBase {
  getConfigBase(): ConfigDatabaseClient | undefined {
    return {
      pool: {
        afterCreate(conn, done) {
          conn.pragma('journal_mode = WAL');
          done();
        },
      },
    } as unknown as ConfigDatabaseClient;
  }

  async fetchDatabases(
    _schemaBuilder: Knex.SchemaBuilder,
    databasePrefix: string,
  ): Promise<IFetchDatabasesResultItem[]> {
    const dbDir = this._getDbDir();
    const files = await globby(`${databasePrefix}*.db`, {
      cwd: dbDir,
      onlyFiles: true,
    });
    return files.map(item => {
      return { name: path.join(dbDir, item) };
    });
  }

  async createDatabase(_schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<string> {
    const dbDir = this._getDbDir();
    await ensureDir(dbDir);
    return path.join(dbDir, `${databaseName}.db`);
  }

  async dropDatabase(_schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await remove(databaseName);
  }

  async insert(builder: Knex.QueryBuilder, datas: any[]): Promise<TableIdentity[]> {
    return await this.insertAsMysql(builder, datas);
  }

  async select(_builder: Knex.QueryBuilder, datas: any[], fn: TypeGetTableColumnsFn): Promise<any[]> {
    const columns = await fn();
    // data
    for (const data of datas) {
      for (const columnName in columns) {
        const column = columns[columnName];
        if (Object.prototype.hasOwnProperty.call(data, columnName)) {
          const value = data[columnName];
          if (column.type === 'json' && value !== undefined && typeof value === 'string') {
            data[columnName] = JSON.parse(value);
          }
        }
      }
    }
    return datas;
  }

  private _getDbDir() {
    return path.join(this.app.projectPath, '.app/sqlite3');
  }
}
