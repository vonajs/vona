import { Knex } from 'knex';

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
export type IModelSelectParamsJoinOnMap = { [key: string]: string | number | boolean | Knex.Raw<any> };
export type IModelSelectParamsJoin = [
  IModelSelectParamsJoinType,
  Knex.TableDescriptor,
  IModelSelectParamsJoinOnMap | Knex.JoinCallback,
];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder = [string, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IModelSelectParams {
  where?: any;
  columns?: any;
  joins?: IModelSelectParamsJoin[];
  orders?: IModelSelectParamsOrder[];
  limit?: number;
  offset?: number;
}

export interface IModelCountParams {
  where?: any;
  joins?: IModelSelectParamsJoin[];
}

export type IModelMethodOptionsCache = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;
export type IModelUpdateOptionsCache = Omit<IModelMethodOptionsGeneral, 'disableInstance'>;

export interface IModelMethodOptionsGeneral {
  disableDeleted?: boolean;
  disableInstance?: boolean;
}

export interface IModelUpdateOptionsGeneral extends IModelMethodOptionsGeneral {
  where?: any;
  disableUpdateTime?: boolean;
}

export interface IModelGetOptions extends IModelMethodOptionsGeneral {
  columns?: any;
}
