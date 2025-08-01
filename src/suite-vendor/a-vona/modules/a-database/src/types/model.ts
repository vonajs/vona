import type { Knex } from 'knex';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeModelParamsInclude } from './relations.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableColumnsOfGeneral } from './relationsColumns.ts';
import type { TypeEntityTableNamesOfGeneral } from './relationsTables.ts';

export type TypeModelCacheType = 'query' | 'entity';

// join
export type IModelSelectParamsJoinType =
  | 'join'
  | 'innerJoin'
  | 'leftJoin'
  | 'leftOuterJoin'
  | 'rightJoin'
  | 'rightOuterJoin'
  | 'fullOuterJoin'
  | 'crossJoin';
// export interface IModelSelectParamsJoinOnMap { [key: string]: string | number | boolean | Knex.Raw<any> }
export type IModelSelectParamsJoin<TRecord, TableNames = undefined, ColumnNames = keyof TRecord> =
  [
    IModelSelectParamsJoinType,
    TableNames,
    [ColumnNames, ColumnNames] | Knex.JoinCallback,
  ];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder<ColumnNames> = [ColumnNames, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IBuildModelSelectParams<
  TRecord,
  Model extends BeanModelMeta | undefined = undefined,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> extends
  IModelRelationIncludeWrapper<Model>,
  IBuildModelSelectParamsBasic<TRecord, TableNames, ColumnNames, Columns> {}

export interface IBuildModelSelectParamsBasic<
  TRecord,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> {
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  columns?: TypeModelColumns<TRecord>;
  where?: TypeModelWhere<TRecord, Columns>;
  joins?: IModelSelectParamsJoin<TRecord, TableNames, ColumnNames>[];
  orders?: IModelSelectParamsOrder<ColumnNames>[];
  limit?: number;
  offset?: number;
}

export type IModelSelectParams<
  TRecord,
  // not use undefined as default value
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelSelectParams<
  TRecord,
  Model,
  TypeEntityTableNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnsOfGeneral<ModelJoins, Model>
>;

export interface IBuildModelCountParams<
  TRecord,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> {
  column?: (keyof TRecord);
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  where?: TypeModelWhere<TRecord, Columns>;
  joins?: IModelSelectParamsJoin<TRecord, TableNames, ColumnNames>[];
}

export type IModelCountParams<
  TRecord,
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelCountParams<
  TRecord,
  TypeEntityTableNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnsOfGeneral<ModelJoins, Model>
>;

export type IModelMethodOptions = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;
export type IModelUpdateOptions<TRecord> = Omit<IModelUpdateOptionsGeneral<TRecord>, 'disableInstance'>;
export type IModelGetOptions<TRecord, Model extends BeanModelMeta | undefined = undefined> = Omit<IModelGetOptionsGeneral<TRecord, Model>, 'disableInstance'>;

export interface IModelMethodOptionsGeneral {
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableCacheQuery?: boolean;
  disableCacheEntity?: boolean;
}

export interface IModelUpdateOptionsGeneral<TRecord> extends IModelMethodOptionsGeneral {
  where?: TypeModelWhere<TRecord>;
  disableUpdateTime?: boolean;
}

export interface IModelGetOptionsGeneral<TRecord, Model extends BeanModelMeta | undefined = undefined>
  extends IModelMethodOptionsGeneral, IModelRelationIncludeWrapper<Model> {
  columns?: TypeModelColumns<TRecord>;
}

export interface IModelSelectParamsPage {
  index?: number;
  size?: number;
}

export interface IModelRelationIncludeWrapper<Model extends BeanModelMeta | undefined = undefined> {
  include?: TypeModelParamsInclude<Model>;
  with?: Record<string, unknown>;
}
