import { Cast, IDecoratorModelOptions, IModelOptions, Virtual, appResource } from '@cabloy/core';
import { Knex } from 'knex';
import { ITableColumns } from './virtual.databaseDialect.js';
import { IModelMethodOptions, IModelSelectParams } from '../types.js';
import { checkWhere } from '../common/checkWhere.js';
import { buildWhere } from '../common/buildWhere.js';
import { getTableOrTableAlias, isRaw } from '../common/utils.js';
import { BeanModelCrud } from './bean.model/bean.model_crud.js';

@Virtual({ scene: 'bean' })
export class BeanModel<TRecord extends {} = any, TResult = any[], TScopeModule = unknown> extends BeanModelCrud<
  TRecord,
  TResult
> {
  get scope() {
    return this.getScope() as TScopeModule;
  }
}
