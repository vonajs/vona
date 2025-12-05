import type { Knex } from 'knex';
import type { IDecoratorDatabaseDialectOptions, IFetchDatabasesResultItem } from 'vona-module-a-orm';
import path from 'node:path';
import { remove } from 'fs-extra';
import { globby } from 'globby';
import { BeanDatabaseDialectBase, DatabaseDialect } from 'vona-module-a-orm';

export interface IDatabaseDialectOptionsBetterSqlite3 extends IDecoratorDatabaseDialectOptions {}

@DatabaseDialect<IDatabaseDialectOptionsBetterSqlite3>()
export class DatabaseDialectBetterSqlite3 extends BeanDatabaseDialectBase {
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
    return path.join(dbDir, databaseName);
  }

  async dropDatabase(_schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await remove(databaseName);
  }

  private _getDbDir() {
    return path.join(this.app.projectPath, '.app/sqlite3');
  }
}
