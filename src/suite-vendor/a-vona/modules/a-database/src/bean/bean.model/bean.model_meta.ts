import type { ServiceDb } from '../../service/db_.ts';
import type { IDatabaseClientRecord, IDecoratorModelOptions, IModelClassRecord, IModelMethodOptionsGeneral, IModelUpdateOptionsGeneral, ITableRecord, TypeEntityMeta, TypeModelClassLike } from '../../types/index.ts';
import type { BeanModel } from '../bean.model.ts';
import { isNil } from '@cabloy/utils';
import { appResource, BeanBase, cast } from 'vona';
import { prepareClassModel } from '../../common/utils.ts';
import { $tableName } from '../../lib/columns.ts';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from '../../types/index.ts';

const SymbolModelDb = Symbol('SymbolModelDb');
const SymbolModelTable = Symbol('SymbolModelTable');

export class BeanModelMeta<TRecord extends {} = {}> extends BeanBase {
  public [SymbolKeyEntity]: TRecord;
  public [SymbolKeyEntityMeta]: TypeEntityMeta<TRecord>;
  public [SymbolKeyModelOptions]: IDecoratorModelOptions;

  private [SymbolModelDb]?: ServiceDb;
  private [SymbolModelTable]?: keyof ITableRecord;

  protected __init__(clientName?: keyof IDatabaseClientRecord | ServiceDb, table?: keyof ITableRecord) {
    // clientName
    if (!isNil(clientName)) {
      if (typeof clientName === 'string') {
        this[SymbolModelDb] = this.bean.database.getDb(clientName);
      } else {
        this[SymbolModelDb] = clientName;
      }
    }
    // table
    this[SymbolModelTable] = table;
  }

  protected get self() {
    return cast<BeanModel>(this);
  }

  protected get connection() {
    return this.db.connection;
  }

  protected get dialect() {
    return this.db.dialect;
  }

  public get scopeDatabase() {
    return this.$scope.database;
  }

  public get modelViewRecord() {
    return this.$scope.version.model.viewRecord;
  }

  public get db() {
    return this[SymbolModelDb] ?? this._getDb();
  }

  private _getDb() {
    let clientName = this.options.clientName;
    // use current
    if (!clientName) return this.bean.database.current;
    // custom clientName
    if (typeof clientName === 'function') {
      clientName = clientName(this.ctx, this);
    }
    // db
    return this.bean.database.getDb(clientName);
  }

  getTable(): keyof ITableRecord {
    return this[SymbolModelTable] ?? this._getTable();
  }

  private _getTable() {
    const table = this.options.table;
    if (table && typeof table === 'string') return table;
    const defaultTable = this.options.entity && $tableName(this.options.entity);
    if (table && typeof table === 'function') {
      return table(this.ctx, defaultTable!, this) as any;
    }
    if (defaultTable) return defaultTable;
    throw new Error(`not found table of ${this.$beanFullName}`);
  }

  get options(): IDecoratorModelOptions {
    return (this.$beanOptions.options || {}) as IDecoratorModelOptions;
  }

  get disableInstance() {
    return this.options.disableInstance === undefined
      ? this.scopeDatabase.config.model.disableInstance
      : this.options.disableInstance;
  }

  get disableDeleted() {
    return this.options.disableDeleted === undefined
      ? this.scopeDatabase.config.model.disableDeleted
      : this.options.disableDeleted;
  }

  get disableUpdateTime() {
    return this.options.disableUpdateTime === undefined
      ? this.scopeDatabase.config.model.disableUpdateTime
      : this.options.disableUpdateTime;
  }

  protected _checkDisableInstanceByOptions(options?: IModelMethodOptionsGeneral) {
    if (options?.disableInstance === true || options?.disableInstance === false) {
      return options?.disableInstance;
    }
    return this.disableInstance;
  }

  protected _checkDisableDeletedByOptions(options?: IModelMethodOptionsGeneral) {
    if (options?.disableDeleted === true || options?.disableDeleted === false) {
      return options?.disableDeleted;
    }
    return this.disableDeleted;
  }

  protected _checkDisableUpdateTimeByOptions(options?: IModelUpdateOptionsGeneral<TRecord>) {
    if (options?.disableUpdateTime === true || options?.disableUpdateTime === false) {
      return options?.disableUpdateTime;
    }
    return this.disableUpdateTime;
  }

  public newInstance(clientName?: keyof IDatabaseClientRecord | ServiceDb, table?: keyof ITableRecord): this {
    return this.app.bean._newBean(this.$beanFullName as any, clientName, table);
  }

  public newInstanceTarget<MODEL extends BeanModelMeta | (keyof IModelClassRecord)>(
    modelClassTarget: TypeModelClassLike<MODEL>,
    table?: keyof ITableRecord,
  ): BeanModelMeta {
    const modelClass2 = prepareClassModel(modelClassTarget);
    const beanFullName = appResource.getBeanFullName(modelClass2);
    return this.app.bean._newBean(beanFullName as any, this.db, table);
  }
}
