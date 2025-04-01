import type { ITableColumns, ITableColumnsDefault } from '../types/columns.ts';
import type { ServiceDbMeta } from './dbMeta.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceColumnsCache } from './columnsCache.ts';

@Service()
export class ServiceColumns extends BeanBase {
  private _dbMeta: ServiceDbMeta;
  private _serviceColumnsCache: ServiceColumnsCache;

  protected __init__(dbMeta: ServiceDbMeta) {
    this._dbMeta = dbMeta;
  }

  private get dbMeta() {
    return this._dbMeta;
  }

  private get serviceColumnsCache() {
    if (!this._serviceColumnsCache) {
      const clientNameReal = this.scope.service.database.prepareClientNameReal(this.dbMeta.clientName);
      this._serviceColumnsCache = this.bean._getBeanSelector(ServiceColumnsCache, clientNameReal);
    }
    return this._serviceColumnsCache;
  }

  async columns(tableName?: string): Promise<ITableColumns> {
    if (!tableName) return {};
    let columns = this.serviceColumnsCache.columnsCache[tableName];
    if (!columns) {
      const dialect = this.dbMeta.dialect;
      const connection = this.dbMeta.connection;
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
    return this.scope.service.database.columnsClear(this.dbMeta.clientName, tableName);
  }
}
