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
  alias?: string;
  where?: any;
  columns?: any;
  joins?: IModelSelectParamsJoin[];
  orders?: IModelSelectParamsOrder[];
  limit?: number;
  offset?: number;
  page?: IModelSelectParamsPage;
}

export interface IModelCountParams {
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
