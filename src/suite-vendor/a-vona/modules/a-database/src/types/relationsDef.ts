import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IBuildModelSelectParamsBasic } from './model.ts';
import type { TypeModelColumn, TypeModelColumnsPatch } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeModelClassLike, TypeModelOfModelLike, TypeSymbolKeyEntity } from './relations.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableColumnsOfGeneral } from './relationsColumns.ts';
import type { TypeEntityTableNamesOfGeneral } from './relationsTables.ts';

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
// export interface TypeModelRelations {
//   [key: string]: TypeModelRelation<any, any>;
// }

// export type TypeModelRelation<MODELSelf extends BeanModelMeta | undefined, MODELTarget extends BeanModelMeta> =
//   IModelRelationHasOne<MODELTarget> |
//   IModelRelationBelongsTo<MODELSelf, MODELTarget> |
//   IModelRelationHasMany<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
> {
  type?: 'hasOne';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS>;
}

export interface IModelRelationBelongsTo<
  MODELSelf extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODELSelf>[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS>;
}

export interface IModelRelationHasMany<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'hasMany';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins>;
}

export interface IModelRelationBelongsToMany<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity];
  keyTo?: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins>;
}

export interface IModelRelationOptionsOne<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumnsPatch<MODEL[TypeSymbolKeyEntity], COLUMNS>;
}

export type IModelRelationOptionsMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelRelationOptionsMany<
  MODEL[TypeSymbolKeyEntity],
  AUTOLOAD,
  COLUMNS,
  TypeEntityTableNamesOfGeneral<ModelJoins, MODEL>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, MODEL>,
  TypeEntityTableColumnsOfGeneral<ModelJoins, MODEL>
>;

export interface IBuildModelRelationOptionsMany<
  TRecord,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<TRecord> = TypeModelColumn<TRecord>,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> extends IBuildModelSelectParamsBasic<TRecord, COLUMNS, TableNames, ColumnNames, Columns> {
  autoload?: AUTOLOAD;
}
