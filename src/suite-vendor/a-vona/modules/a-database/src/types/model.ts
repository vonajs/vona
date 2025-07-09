import type { Knex } from 'knex';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableNamesOfGeneral, TypeModelParamsInclude } from './relations.ts';

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
export type IModelSelectParamsJoin<TableNames, ColumnNames> = [
  IModelSelectParamsJoinType,
  TableNames,
  [ColumnNames, ColumnNames] | Knex.JoinCallback,
];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder<ColumnNames> = [ColumnNames, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IBuildModelSelectParams<TRecord, Model extends BeanModelMeta, TableNames, ColumnNames>
  extends IModelRelationIncludeWrapper<Model> {
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  where?: TypeModelWhere<TRecord>;
  columns?: TypeModelColumns<TRecord>;
  joins?: IModelSelectParamsJoin<TableNames, ColumnNames>[];
  orders?: IModelSelectParamsOrder<ColumnNames>[];
  limit?: number;
  offset?: number;
}

export type IModelSelectParams<
  TRecord,
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelSelectParams<
  TRecord,
  Model,
  TypeEntityTableNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>
>;

export interface IBuildModelCountParams<TRecord, TableNames, ColumnNames> {
  count?: (keyof TRecord);
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  where?: TypeModelWhere<TRecord>;
  joins?: IModelSelectParamsJoin<TableNames, ColumnNames>[];
}

export type IModelCountParams<
  TRecord,
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelCountParams<
  TRecord,
  TypeEntityTableNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>
>;

export type IModelMethodOptions = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;
export type IModelUpdateOptions<TRecord> = Omit<IModelUpdateOptionsGeneral<TRecord>, 'disableInstance'>;
export type IModelGetOptions<TRecord, Model extends BeanModelMeta = BeanModelMeta> = Omit<IModelGetOptionsGeneral<TRecord, Model>, 'disableInstance'>;

export interface IModelMethodOptionsGeneral {
  disableDeleted?: boolean;
  disableInstance?: boolean;
}

export interface IModelUpdateOptionsGeneral<TRecord> extends IModelMethodOptionsGeneral {
  where?: TypeModelWhere<TRecord>;
  disableUpdateTime?: boolean;
}

export interface IModelGetOptionsGeneral<TRecord, Model extends BeanModelMeta = BeanModelMeta>
  extends IModelMethodOptionsGeneral, IModelRelationIncludeWrapper<Model> {
  columns?: TypeModelColumns<TRecord>;
}

export interface IModelSelectParamsPage {
  index?: number;
  size?: number;
}

export interface IModelRelationIncludeWrapper<Model extends BeanModelMeta = BeanModelMeta> {
  include?: TypeModelParamsInclude<Model>;
  with?: Record<string, unknown>;
}
