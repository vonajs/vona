import type { ITableColumns, ITableColumnsDefault } from '../types/columns.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const SymbolColumnsCache = Symbol('SymbolColumnsCache');
const SymbolColumnsDefaultCache = Symbol('SymbolColumnsDefaultCache');

@Service()
export class ServiceColumnsCache extends BeanBase {
  clientName: keyof IDatabaseClientRecord;
  private [SymbolColumnsCache]: Record<string, ITableColumns> = {};
  private [SymbolColumnsDefaultCache]: Record<string, ITableColumnsDefault> = {};
  private _onColumnsClearCancel?: Function;

  /** real client name */
  protected __init__(clientName: keyof IDatabaseClientRecord) {
    this.clientName = clientName;
    this._onColumnsClearCancel = this.scope.event.columnsClear.on(({ clientName, tableName }, next) => {
      if (clientName === this.clientName) {
        this.columnsClear(tableName);
      }
      next();
    });
  }

  protected async __dispose__() {
    this._onColumnsClearCancel?.();
  }

  get columnsCache() {
    return this[SymbolColumnsCache];
  }

  get columnsDefaultCache() {
    return this[SymbolColumnsDefaultCache];
  }

  columnsClear(tableName?: string) {
    if (tableName) {
      const exists = this.columnsCache[tableName];
      delete this.columnsCache[tableName];
      delete this.columnsDefaultCache[tableName];
      return exists;
    } else {
      const exists = Object.keys(this.columnsCache).length > 0;
      this[SymbolColumnsCache] = {};
      this[SymbolColumnsDefaultCache] = {};
      return exists;
    }
  }
}
