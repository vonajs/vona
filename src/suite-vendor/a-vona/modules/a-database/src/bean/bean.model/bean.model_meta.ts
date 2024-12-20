import { BeanBase, cast, appResource } from 'vona';
import { BeanModel } from '../bean.model.js';
import {
  IDecoratorEntityOptions,
  IDecoratorModelOptions,
  IModelMethodOptionsGeneral,
  IModelUpdateOptionsGeneral,
} from '../../types/index.js';
import { Knex } from 'knex';

export class BeanModelMeta extends BeanBase {
  protected get self() {
    return cast<BeanModel>(this);
  }

  public get scopeDatabase() {
    return this.$scope.database;
  }

  public get modelViewRecord() {
    return this.$scope.version.model.viewRecord;
  }

  public get dialectClient() {
    return cast<Knex.Client>(cast(this.ctx.db).client).config.client as string;
  }

  public get dialect() {
    return this.app.bean.database.getDialect(this.dialectClient);
  }

  get table(): string {
    let table = this.options.table;
    if (!table && this.options.entity) {
      const beanOptionsEntity = appResource.getBean(this.options.entity as any);
      const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
      table = entityOptions.table;
    }
    return table!;
  }

  get options(): IDecoratorModelOptions {
    return (this.beanOptions.options || {}) as IDecoratorModelOptions;
  }

  get disableInstance() {
    return this.options.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options.disableInstance;
  }

  get disableDeleted() {
    return this.options.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options.disableDeleted;
  }

  get disableUpdateTime() {
    return this.options.disableUpdateTime === undefined
      ? this.app.config.model.disableUpdateTime
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

  protected _checkDisableUpdateTimeByOptions(options?: IModelUpdateOptionsGeneral) {
    if (options?.disableUpdateTime === true || options?.disableUpdateTime === false) {
      return options?.disableUpdateTime;
    }
    return this.disableUpdateTime;
  }
}
