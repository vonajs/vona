import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IBuildModelSelectParamsBasic } from './model.ts';
import type { TypeModelColumn } from './modelWhere.ts';
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
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD, COLUMNS>;
}

export interface IModelRelationHasMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'hasMany';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD, ModelJoins>;
}

export interface IModelRelationBelongsToMany<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD, ModelJoins>;
}

export interface IModelRelationOptionsOne<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
> {
  autoload?: AUTOLOAD;
  columns?: COLUMNS | COLUMNS[];
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
> extends IBuildModelSelectParamsBasic<TRecord, TableNames, ColumnNames, Columns> {
  autoload?: AUTOLOAD;
}
