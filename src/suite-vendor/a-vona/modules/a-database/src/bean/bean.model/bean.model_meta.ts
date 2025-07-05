import type { ServiceDb } from '../../service/db.ts';
import type {
  IDatabaseClientRecord,
  IDecoratorModelOptions,
  IModelMethodOptionsGeneral,
  IModelUpdateOptionsGeneral,
  ITableRecord,
  TypeEntityMeta,
} from '../../types/index.ts';
import type { BeanModel } from '../bean.model.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase, cast } from 'vona';
import { $tableName } from '../../lib/columns.ts';

const SymbolModelDb = Symbol('SymbolModelDb');

export class BeanModelMeta<TRecord extends {} = {}> extends BeanBase {
  public $entity: TRecord;
  public $entityMeta: TypeEntityMeta<TRecord>;

  private [SymbolModelDb]: ServiceDb;

  protected __init__(clientNameSelector?: keyof IDatabaseClientRecord | ServiceDb) {
    if (isNil(clientNameSelector)) return;
    if (typeof clientNameSelector === 'string') {
      const serviceDatabase = this.$scope.database.service.database;
      this[SymbolModelDb] = this.bean.database.createDb(serviceDatabase.parseClientNameSelector(clientNameSelector));
    } else {
      this[SymbolModelDb] = clientNameSelector;
    }
  }

  protected get self() {
    return cast<BeanModel>(this);
  }

  protected get db() {
    return this[SymbolModelDb] ?? this.bean.database.current;
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

  getTable(method?: string, methodParams?: any[], methodOptions?: IModelMethodOptionsGeneral): keyof ITableRecord {
    const table = this.options.table;
    if (table && typeof table === 'string') return table;
    const defaultTable = this.options.entity && $tableName(this.options.entity);
    if (table && typeof table === 'function') {
      return table(this.ctx, defaultTable!, this, method, methodParams, methodOptions) as any;
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

  public newInstance(clientName?: keyof IDatabaseClientRecord | ServiceDb): this {
    return this.app.bean._newBean(this.$beanFullName as any, clientName);
  }
}
