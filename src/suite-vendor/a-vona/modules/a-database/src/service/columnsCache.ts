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

  protected __init__(clientName: keyof IDatabaseClientRecord) {
    this.clientName = clientName;
    this._onColumnsClearCancel = this.scope.event.columnsClear.on(async ({ clientName, tableName }, next) => {
      if (clientName === this.clientName) {
        await this.reload(clientConfig);
      }
      await next();
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
}
