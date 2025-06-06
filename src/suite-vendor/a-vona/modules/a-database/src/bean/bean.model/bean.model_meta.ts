import type { ServiceDb } from '../../service/db.ts';
import type {
  IDatabaseClientRecord,
  IDecoratorEntityOptions,
  IDecoratorModelOptions,
  IModelMethodOptionsGeneral,
  IModelUpdateOptionsGeneral,
} from '../../types/index.ts';
import type { BeanModel } from '../bean.model.ts';
import { isNil } from '@cabloy/utils';
import { appResource, BeanBase, cast } from 'vona';

const SymbolModelDb = Symbol('SymbolModelDb');

export class BeanModelMeta<TRecord extends {}> extends BeanBase {
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

  get table(): string {
    let table = this.options.table;
    if (!table && this.options.entity) {
      const beanOptionsEntity = appResource.getBean(this.options.entity);
      const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
      table = entityOptions.table;
    }
    return table!;
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
