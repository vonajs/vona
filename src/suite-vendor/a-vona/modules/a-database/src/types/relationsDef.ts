import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsJoin, IModelSelectParamsOrder } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeSymbolKeyEntity } from './relations.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableColumnsOfGeneral } from './relationsColumns.ts';
import type { TypeEntityTableNamesOfGeneral } from './relationsTables.ts';

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
// export interface TypeModelRelations {
//   [key: string]: TypeModelRelation<any, any>;
// }

export type TypeModelClassLike<MODEL extends BeanModelMeta> = (() => Constructable<MODEL>) | Constructable<MODEL>;

// export type TypeModelRelation<MODELSelf extends BeanModelMeta | undefined, MODELTarget extends BeanModelMeta> =
//   IModelRelationHasOne<MODELTarget> |
//   IModelRelationBelongsTo<MODELSelf, MODELTarget> |
//   IModelRelationHasMany<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasOne';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsTo<
  MODELSelf extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationHasMany<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasMany';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsToMany<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationOptionsOne<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumns<MODEL[TypeSymbolKeyEntity]>;
}

export type IModelRelationOptionsMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelRelationOptionsMany<
  MODEL[TypeSymbolKeyEntity],
  AUTOLOAD,
  TypeEntityTableNamesOfGeneral<ModelJoins, MODEL>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, MODEL>,
  TypeEntityTableColumnsOfGeneral<ModelJoins, MODEL>
>;

export interface IBuildModelRelationOptionsMany<
  TRecord,
  AUTOLOAD extends boolean = false,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> {
  autoload?: AUTOLOAD;
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  columns?: TypeModelColumns<TRecord>;
  where?: TypeModelWhere<TRecord, Columns>;
  joins?: IModelSelectParamsJoin<TRecord, TableNames, ColumnNames>[];
  orders?: IModelSelectParamsOrder<ColumnNames>[];
  limit?: number;
  offset?: number;
}
