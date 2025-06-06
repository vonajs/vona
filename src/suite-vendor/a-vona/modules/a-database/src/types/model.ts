import type { Knex } from 'knex';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';

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
export interface IModelSelectParamsJoinOnMap { [key: string]: string | number | boolean | Knex.Raw<any> }
export type IModelSelectParamsJoin = [
  IModelSelectParamsJoinType,
  Knex.TableDescriptor,
  IModelSelectParamsJoinOnMap | Knex.JoinCallback,
];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder = [string, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IModelSelectParams<TRecord> {
  alias?: string;
  distinct?: any;
  where?: TypeModelWhere<TRecord>;
  columns?: any;
  joins?: IModelSelectParamsJoin[];
  orders?: IModelSelectParamsOrder[];
  limit?: number;
  offset?: number;
  page?: IModelSelectParamsPage;
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
