import type { Knex } from 'knex';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type {  IModelClassRecord } from './onion/model.ts';
import type { TypeEntityTableColumnNamesOfGeneral,  TypeModelParamsInclude } from './relations.ts';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';

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
export type IModelSelectParamsJoin<ColumnNames extends string> = [
  IModelSelectParamsJoinType,
  Knex.TableDescriptor,
  [ColumnNames, ColumnNames][] | Knex.JoinCallback,
];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder<TRecord> = [keyof TRecord, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IModelSelectParams<
  TRecord,
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  alias?: string;
  distinct?: any;
  where?: TypeModelWhere<TRecord>;
  columns?: TypeModelColumns<TRecord>;
  joins?: IModelSelectParamsJoin<TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>>[];
  orders?: IModelSelectParamsOrder<TRecord>[];
  limit?: number;
  offset?: number;
  page?: IModelSelectParamsPage;
  include?: TypeModelParamsInclude<Model>;
  with?: Record<string, unknown>;
}

export interface IModelCountParams<TRecord> {
  alias?: string;
  count?: any;
  distinct?: any;
  where?: TypeModelWhere<TRecord>;
  joins?: IModelSelectParamsJoin[];
}

export type IModelMethodOptions = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;
export type IModelUpdateOptions<TRecord> = Omit<IModelUpdateOptionsGeneral<TRecord>, 'disableInstance'>;
export type IModelGetOptions<TRecord> = Omit<IModelGetOptionsGeneral<TRecord>, 'disableInstance'>;

export interface IModelMethodOptionsGeneral {
  disableDeleted?: boolean;
  disableInstance?: boolean;
}

export interface IModelUpdateOptionsGeneral<TRecord> extends IModelMethodOptionsGeneral {
  where?: TypeModelWhere<TRecord>;
  disableUpdateTime?: boolean;
}

export interface IModelGetOptionsGeneral<TRecord> extends IModelMethodOptionsGeneral {
  columns?: TypeModelColumns<TRecord>;
}

export interface IModelSelectParamsPage {
  index?: number;
  size?: number;
}
