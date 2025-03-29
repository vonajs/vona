import type { ITableColumns } from '../types/columns.ts';
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
      const clientNameReal = this.bean.database.prepareClientNameReal(this.dbMeta.currentClientName);
      this._serviceColumnsCache = this.bean._getBeanSelector(ServiceColumnsCache, clientNameReal);
    }
    return this._serviceColumnsCache;
  }

  async columns(tableName?: string): Promise<ITableColumns> {
    if (!tableName) return {};
    let columns = this.serviceColumnsCache.columnsCache[tableName];
    if (!columns) {
      const dialect = this.dbMeta.currentDialect;
      const db = this.dbMeta.current;
      const map = await db(tableName).columnInfo();
      columns = this.serviceColumnsCache.columnsCache[tableName] = {};
      for (const name in map) {
        columns[name] = dialect.coerceColumn(map[name]);
      }
    }
    return columns;
  }
}
