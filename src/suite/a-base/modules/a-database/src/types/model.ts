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
  Knex.TableDescriptor | Knex.AliasDict,
  IModelSelectParamsJoinOnMap | Knex.JoinCallback,
];

// order
export type IModelSelectParamsOrderDirection = 'asc' | 'desc';
export type IModelSelectParamsOrderNulls = 'first' | 'last';
export type IModelSelectParamsOrder = [string, IModelSelectParamsOrderDirection?, IModelSelectParamsOrderNulls?];

export interface IModelSelectParams {
  table?: Knex.TableDescriptor | Knex.AliasDict;
  where?: any;
  columns?: any;
  joins?: IModelSelectParamsJoin[];
  orders?: IModelSelectParamsOrder[];
  limit?: number;
  offset?: number;
}
