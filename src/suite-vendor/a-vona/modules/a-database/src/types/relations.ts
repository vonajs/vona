import type { Constructable, Type, TypeClassOfClassLike } from 'vona';
import type { number } from 'zod/v4';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsOrder } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type { IDecoratorModelOptions } from './onion/model.ts';

export const SymbolKeyEntity = Symbol('$entity');
export const SymbolKeyEntityMeta = Symbol('$entityMeta');
export const SymbolKeyModelOptions = Symbol('$modelOptions');
export type TypeSymbolKeyEntity = typeof SymbolKeyEntity;
export type TypeSymbolKeyEntityMeta = typeof SymbolKeyEntityMeta;
export type TypeSymbolKeyModelOptions = typeof SymbolKeyModelOptions;

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
export interface TypeModelRelations {
  [key: string]: TypeModelRelation<any, any>;
}

export type TypeModelRelation<MODELSelf extends BeanModelMeta = BeanModelMeta, MODELTarget extends BeanModelMeta = BeanModelMeta> =
  IModelRelationHasOne<MODELTarget> |
  IModelRelationBelongsTo<MODELSelf, MODELTarget> |
  IModelRelationHasMany<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasOne';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsTo<
  MODELSelf extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsTo';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationHasMany<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasMany';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsToMany<
  MODELMiddle extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsToMany';
  modelMiddle?: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>;
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationOptionsOne<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumns<MODEL[TypeSymbolKeyEntity]>;
}

export interface IModelRelationOptionsMany<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumns<MODEL[TypeSymbolKeyEntity]>;
  where?: TypeModelWhere<MODEL[TypeSymbolKeyEntity]>;
  orders?: IModelSelectParamsOrder<MODEL[TypeSymbolKeyEntity]>[];
  limit?: number;
  offset?: number;
}

export type TypeModelParamsInclude<ModelOptions extends IDecoratorModelOptions | unknown> = ModelOptions extends IDecoratorModelOptions ? {
  [relationName in keyof ModelOptions['relations'] ]?: TypeModelParamsRelationOptions<ModelOptions['relations'][relationName]>;
} : never;

export type TypeModelParamsRelationOptions<Relation> =
  boolean
  | Omit<TypeUtilGetRelationOptions<Relation>, 'autoload'>
  & { include?: TypeModelParamsInclude<TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>> };

export type TypeUtilGetRelationType<Relation> = Relation extends { type?: infer TYPE } ? TYPE : unknown;
export type TypeUtilGetRelationModel<Relation> = TypeClassOfClassLike<Relation extends { model?: infer MODEL } ? MODEL : unknown>;
export type TypeUtilGetRelationEntity<Relation> = TypeUtilGetModelEntity<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationOptions<Relation> = Relation extends { options?: infer OPTIONS } ? OPTIONS : unknown;
export type TypeUtilGetRelationOptionsAutoload<Relation> = Relation extends { options?: { autoload?: infer AUTOLOAD } } ? AUTOLOAD : unknown;
export type TypeUtilGetModelOptions<Model extends BeanModelMeta | unknown> = Model extends BeanModelMeta ? Model[TypeSymbolKeyModelOptions] : unknown;
export type TypeUtilGetModelEntity<Model extends BeanModelMeta | unknown> = Model extends BeanModelMeta ? Model[TypeSymbolKeyEntity] : unknown;

export type TypeUtilGetRelationEntityByType<Relation> =
  TypeUtilGetEntityByType<TypeUtilGetRelationEntity<Relation>, TypeUtilGetRelationType<Relation>>;
export type TypeUtilGetEntityByType<TRecord, TYPE> = TYPE extends 'hasMany' | 'belongsToMany' ? Array<TRecord> : TRecord | undefined;

export type TypeUtilGetParamsInlcude<TParams> = TParams extends { include?: infer INCLUDE extends {} } ? INCLUDE : undefined;
export type TypeUtilGetParamsWith<TParams> = TParams extends { with?: infer WITH } ? WITH : undefined;

export type TypeModelRelationResult<TRecord, TModelOptions extends IDecoratorModelOptions, TParams> =
  TRecord &
  TypeModelRelationResultMergeInclude<TModelOptions, TypeUtilGetParamsInlcude<TParams>>;

export type TypeModelRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined> = {
  [RelationName in (keyof TModelOptions['relations'])]:
  TInclude extends undefined ?
    TypeModelRelationResultMergeAutoload<TModelOptions['relations'][RelationName]> :
    TypeModelRelationResultMergeIncludeItem<TModelOptions['relations'][RelationName], TInclude[RelationName]>;
};

export type TypeModelRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilGetRelationEntityByType<Relation> : never;

export type TypeModelRelationResultMergeIncludeItem<Relation, IncludeItem> =
  IncludeItem extends false ? never :
  IncludeItem extends true ? TypeUtilGetRelationEntityByType<Relation> : undefined;
