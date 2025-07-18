import type { ITableColumns, ITableColumnsDefault } from '../types/columns.ts';
import type { ServiceDb } from './db_.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { ServiceColumnsCache } from './columnsCache.ts';

@Service()
export class ServiceColumns extends BeanBase {
  private _db: ServiceDb;
  private _serviceColumnsCache: ServiceColumnsCache;

  protected __init__(db: ServiceDb) {
    this._db = db;
  }

  private get db() {
    return this._db;
  }

  private get serviceColumnsCache() {
    if (!this._serviceColumnsCache) {
      const clientNameReal = this.scope.service.database.prepareClientNameReal(this.db.clientName);
      this._serviceColumnsCache = this.bean._getBeanSelector(ServiceColumnsCache, clientNameReal);
    }
    return this._serviceColumnsCache;
  }

  async columns(tableName?: string): Promise<ITableColumns> {
    if (!tableName) return {};
    let columns = this.serviceColumnsCache.columnsCache[tableName];
    if (!columns) {
      const dialect = this.db.dialect;
      const connection = this.db.connection;
      const map = await connection(tableName).columnInfo();
      columns = this.serviceColumnsCache.columnsCache[tableName] = {};
      for (const name in map) {
        columns[name] = dialect.coerceColumn(map[name]);
      }
    }
    return columns;
  }

  async defaultData(tableName?: string): Promise<ITableColumnsDefault> {
    if (!tableName) return {};
    if (!this.serviceColumnsCache.columnsDefaultCache[tableName]) {
      const data = {};
      // columns
      const columns = await this.columns(tableName);
      for (const columnName in columns) {
        data[columnName] = columns[columnName].default;
      }
      this.serviceColumnsCache.columnsDefaultCache[tableName] = data;
    }
    return this.serviceColumnsCache.columnsDefaultCache[tableName];
  }

  columnsClear(tableName?: string) {
    return this.scope.service.database.columnsClear(this.db.clientName, tableName);
  }
}
