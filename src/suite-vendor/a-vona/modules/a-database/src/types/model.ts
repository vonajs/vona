import type { Knex } from 'knex';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from './onion/model.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableColumnNamesOfModelJoins, TypeEntityTableColumnNamesOfModelOptions, TypeModelParamsInclude, TypeModelRelationModelsOfModelOptions } from './relations.ts';

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
  ModelOptions extends IDecoratorModelOptions = IDecoratorModelOptions,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  alias?: string;
  distinct?: any;
  where?: TypeModelWhere<TRecord>;
  columns?: TypeModelColumns<TRecord>;
  joins?: IModelSelectParamsJoin<TypeEntityTableColumnNamesOfGeneral<ModelJoins, ModelOptions>>[];
  orders?: IModelSelectParamsOrder<TRecord>[];
  limit?: number;
  offset?: number;
  page?: IModelSelectParamsPage;
  include?: TypeModelParamsInclude<ModelOptions>;
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
