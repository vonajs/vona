import { Knex } from 'knex';

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

export interface IModelSelectParams {
  table?: Knex.TableDescriptor | Knex.AliasDict;
  where?: any;
  columns?: any;
  joins?: IModelSelectParamsJoin[];
  orders?: any;
  limit?: number;
  offset?: number;
}
