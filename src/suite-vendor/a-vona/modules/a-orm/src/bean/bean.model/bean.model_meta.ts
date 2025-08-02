import type { ServiceDb } from '../../service/db_.ts';
import type { IDatabaseClientRecord, IDecoratorModelOptions, IModelClassRecord, IModelMethodOptionsGeneral, IModelUpdateOptionsGeneral, ITableRecord, TypeEntityMeta, TypeModelClassLike, TypeModelRelationOptionsMetaClient } from '../../types/index.ts';
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

  public get scopeOrm() {
    return this.$scope.orm;
  }

  public get modelViewRecord() {
    return this.$scope.version.model.viewRecord;
  }

  public get db() {
    return this[SymbolModelDb] ?? this._getDb();
  }

  private _getDb() {
    let clientName = this.options.client;
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
    return this.options.disableInstance ?? this.scopeOrm.config.model.disableInstance;
  }

  get disableDeleted() {
    return this.options.disableDeleted ?? this.scopeOrm.config.model.disableDeleted;
  }

  get disableCreateTime() {
    return this.options.disableCreateTime ?? this.scopeOrm.config.model.disableCreateTime;
  }

  get disableUpdateTime() {
    return this.options.disableUpdateTime ?? this.scopeOrm.config.model.disableUpdateTime;
  }

  protected _checkDisableInstanceByOptions(options?: IModelMethodOptionsGeneral) {
    return options?.disableInstance ?? this.disableInstance;
  }

  protected _checkDisableDeletedByOptions(options?: IModelMethodOptionsGeneral) {
    return options?.disableDeleted ?? this.disableDeleted;
  }

  protected _checkDisableCreateTimeByOptions(options?: IModelUpdateOptionsGeneral<TRecord>) {
    return options?.disableCreateTime ?? this.disableCreateTime;
  }

  protected _checkDisableUpdateTimeByOptions(options?: IModelUpdateOptionsGeneral<TRecord>) {
    return options?.disableUpdateTime ?? this.disableUpdateTime;
  }

  public newInstance(client?: keyof IDatabaseClientRecord | ServiceDb, table?: keyof ITableRecord): this {
    return this.app.bean._newBean(this.$beanFullName as any, client ?? this.db, table);
  }

  public newInstanceTarget<MODEL extends BeanModelMeta | (keyof IModelClassRecord)>(
    modelClassTarget: TypeModelClassLike<MODEL>,
    client?: TypeModelRelationOptionsMetaClient,
    table?: keyof ITableRecord,
  ): BeanModelMeta {
    const modelClass2 = prepareClassModel(modelClassTarget);
    const beanOptions = appResource.getBean(modelClass2);
    const beanFullName = beanOptions!.beanFullName;
    const options = beanOptions?.options as IDecoratorModelOptions | undefined;
    if (client === 'auto') {
      client = options?.client ? 'initial' : 'inherit';
    }
    if (client === 'initial') {
      return this.app.bean._newBean(beanFullName as any, undefined, table);
    } else if (client === 'inherit') {
      client = this.db;
    }
    return this.app.bean._newBean(beanFullName as any, client ?? this.db, table);
  }
}
