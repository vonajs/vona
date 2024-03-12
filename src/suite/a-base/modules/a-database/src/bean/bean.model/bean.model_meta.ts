import { BeanBase, Cast, IDecoratorModelOptions, IModelOptions, appResource } from '@cabloy/core';
import { BeanModel } from '../virtual.model.js';
import { IModelMethodOptionsGeneral, IModelUpdateOptionsGeneral } from '../../types.js';
import { __ThisModule__ } from '../../resource/this.js';
import { Knex } from 'knex';

export class BeanModelMeta extends BeanBase {
  protected get self() {
    return Cast<BeanModel>(this);
  }

  public get scopeModuleADatabase() {
    return this.bean.scope(__ThisModule__);
  }

  public get modelViewRecord() {
    return this.getScope('a-version').model.viewRecord;
  }

  public get dialect() {
    const client = Cast<Knex.Client>(Cast(this.ctx.db).client).config.client as string;
    return this.app.bean.database.getDialect(client);
  }

  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }

  protected get __modelOptions() {
    const beanOptions = this.__beanOptions;
    return beanOptions?.options as IDecoratorModelOptions;
  }

  get table(): string {
    return this.__modelOptions?.table;
  }

  get options(): IModelOptions {
    return this.__modelOptions?.options;
  }

  get disableInstance() {
    return this.options?.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options?.disableInstance;
  }

  get disableDeleted() {
    return this.options?.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options?.disableDeleted;
  }

  get disableUpdateTime() {
    return this.options?.disableUpdateTime === undefined
      ? this.app.config.model.disableUpdateTime
      : this.options?.disableUpdateTime;
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

  /** 以下代码是临时使用 */
  format(..._args) {
    return '';
  }
  _formatWhere(..._args): any {
    return '';
  }
  _orders(..._args) {
    return '';
  }
  _limit(..._args) {
    return '';
  }
}
