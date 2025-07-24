import type { ITableColumns, ITableColumnsDefault } from '../types/columns.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

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

  get columnsDefaultCache() {
    return this[SymbolColumnsDefaultCache];
  }

  getColumnsCache(table: string) {
    return this[SymbolColumnsCache][table];
  }

  setColumnsCache(table: string, columns: ITableColumns) {
    this[SymbolColumnsCache][table] = columns;
  }

  deleteColumnsCache(table: string) {
    delete this[SymbolColumnsCache][table];
  }

  columnsClear(tableName?: string) {
    if (tableName) {
      const exists = this.getColumnsCache(tableName);
      this.deleteColumnsCache(tableName);
      delete this.columnsDefaultCache[tableName];
      return exists;
    } else {
      const exists = Object.keys(this[SymbolColumnsCache]).length > 0;
      this[SymbolColumnsCache] = {};
      this[SymbolColumnsDefaultCache] = {};
      return exists;
    }
  }
}
