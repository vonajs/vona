import type { Knex } from 'knex';
import type { TableIdentity } from 'table-identity';
import type { ConfigDatabaseClient, IDecoratorDatabaseDialectOptions, IFetchDatabasesResultItem, TypeDatabaseDialectTableColumnsFn } from 'vona-module-a-orm';
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
          const pragma: { journal_mode: string }[] = conn.pragma('journal_mode');
          if (pragma[0]?.journal_mode?.toLocaleLowerCase() !== 'wal') {
            conn.pragma('journal_mode = wal');
          }
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

  async select(builder: Knex.QueryBuilder, datas: any[], fn: TypeDatabaseDialectTableColumnsFn): Promise<any[]> {
    return await this.selectAsSqlite3(builder, datas, fn);
  }

  private _getDbDir() {
    return path.join(this.app.projectPath, '.app/sqlite3');
  }
}
