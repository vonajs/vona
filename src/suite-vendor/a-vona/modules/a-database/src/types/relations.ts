import type { Constructable } from 'vona';
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

export type TypeModelParamsInclude<ModelOptions extends IDecoratorModelOptions | undefined> = ModelOptions extends IDecoratorModelOptions ? {
  [relationName in keyof ModelOptions['relations'] ]?: TypeModelParamsRelationOptions<ModelOptions['relations'][relationName]>;
} : never;

export type TypeModelParamsRelationOptions<Relation> =
  boolean
  | Omit<TypeUtilGetRelationOptions<Relation>, 'autoload'>
  & { include?: TypeModelParamsInclude<TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>> };

export type TypeModelClassOfClassLike<ClassLike> =
  ClassLike extends
  ((() => Constructable<infer Result extends BeanModelMeta>) | Constructable<infer Result extends BeanModelMeta>)
    ? Result : undefined;

export type TypeUtilGetRelationType<Relation> = Relation extends { type?: infer TYPE } ? TYPE : undefined;
export type TypeUtilGetRelationModel<Relation> =
  TypeModelClassOfClassLike<Relation extends
  { model?: infer MODEL extends ((() => Constructable<BeanModelMeta>) | Constructable<BeanModelMeta>) }
    ? MODEL : undefined>;
export type TypeUtilGetRelationModelOptions<Relation> = TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationEntity<Relation> = TypeUtilGetModelEntity<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationOptions<Relation> = Relation extends { options?: infer OPTIONS } ? OPTIONS : undefined;
export type TypeUtilGetRelationOptionsAutoload<Relation> = Relation extends { options?: { autoload?: infer AUTOLOAD } } ? AUTOLOAD : undefined;
export type TypeUtilGetModelOptions<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model[TypeSymbolKeyModelOptions] : undefined;
export type TypeUtilGetModelEntity<Model extends BeanModelMeta | undefined> = Model extends BeanModelMeta ? Model[TypeSymbolKeyEntity] : undefined;

export type TypeUtilGetRelationEntityByType<Relation, TInclude extends {} | undefined> =
  TypeUtilGetEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModelOptions<Relation>,
    TInclude
  >;
export type TypeUtilGetEntityByType<TRecord, TYPE, TModelOptions extends IDecoratorModelOptions | undefined, TInclude extends {} | undefined> =
  TYPE extends 'hasMany' | 'belongsToMany' ? Array<TypeModelRelationResult<TRecord, TModelOptions, TInclude>> : TypeModelRelationResult<TRecord, TModelOptions, TInclude> | undefined;

export type TypeUtilGetParamsInlcude<TParams> = TParams extends { include?: infer INCLUDE extends {} } ? INCLUDE : undefined;
export type TypeUtilGetParamsWith<TParams> = TParams extends { with?: infer WITH } ? WITH : undefined;

export type TypeModelRelationResult<TRecord, TModelOptions extends IDecoratorModelOptions | undefined, TParams> =
  TRecord &
  (TModelOptions extends IDecoratorModelOptions ? TypeModelRelationResultMergeInclude<TModelOptions, TypeUtilGetParamsInlcude<TParams>> : {});

export type TypeModelRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined> = {
  [RelationName in (keyof TModelOptions['relations'])]:
  TInclude extends {} ?
    TypeModelRelationResultMergeIncludeItem<TModelOptions['relations'][RelationName], TInclude[RelationName]> :
    TypeModelRelationResultMergeAutoload<TModelOptions['relations'][RelationName]>;
};

export type TypeModelRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilGetRelationEntityByType<Relation, undefined> : never;

export type TypeModelRelationResultMergeIncludeItem<Relation, IncludeItem> =
  IncludeItem extends false ? never :
  IncludeItem extends true ?
    TypeUtilGetRelationEntityByType<Relation, undefined> :
    TypeUtilGetRelationEntityByType<Relation, TypeUtilGetParamsInlcude<IncludeItem>>;
