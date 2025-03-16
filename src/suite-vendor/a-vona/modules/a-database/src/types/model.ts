import type { Knex } from 'knex';

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

export type TypeModelWhere<TRecord = {}> = {
  [prop in keyof TRecord]: any;
};

export interface IModelSelectParams<TRecord = {}> {
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

export interface IModelCountParams {
  alias?: string;
  count?: any;
  distinct?: any;
  where?: any;
  joins?: IModelSelectParamsJoin[];
}

export type IModelMethodOptions = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;
export type IModelUpdateOptions = Omit<IModelUpdateOptionsGeneral, 'disableInstance'>;
export type IModelGetOptions = Omit<IModelGetOptionsGeneral, 'disableInstance'>;

export interface IModelMethodOptionsGeneral {
  disableDeleted?: boolean;
  disableInstance?: boolean;
}

export interface IModelUpdateOptionsGeneral extends IModelMethodOptionsGeneral {
  where?: any;
  disableUpdateTime?: boolean;
}

export interface IModelGetOptionsGeneral extends IModelMethodOptionsGeneral {
  columns?: any;
}

export interface IModelSelectParamsPage {
  index?: number;
  size?: number;
}
