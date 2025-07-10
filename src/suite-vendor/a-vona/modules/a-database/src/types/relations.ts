import type { Constructable, OmitNever } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions } from './onion/model.ts';

export const SymbolKeyEntity = Symbol('$entity');
export const SymbolKeyEntityMeta = Symbol('$entityMeta');
export const SymbolKeyModelOptions = Symbol('$modelOptions');
export type TypeSymbolKeyEntity = typeof SymbolKeyEntity;
export type TypeSymbolKeyEntityMeta = typeof SymbolKeyEntityMeta;
export type TypeSymbolKeyModelOptions = typeof SymbolKeyModelOptions;

export type TypeModelParamsInclude<MODEL extends BeanModelMeta | undefined> =
  TypeModelParamsIncludeByModelOptions<TypeUtilGetModelOptions<MODEL>>;

export type TypeModelParamsIncludeByModelOptions<ModelOptions extends IDecoratorModelOptions | undefined> =
  ModelOptions extends IDecoratorModelOptions ? {
    [relationName in keyof ModelOptions['relations'] ]?: TypeModelParamsRelationOptions<ModelOptions['relations'][relationName]>;
  } : never;

export type TypeModelParamsRelationOptions<Relation> =
  boolean
  | Omit<TypeUtilGetRelationOptions<Relation>, 'autoload'>
  & {
    include?: TypeModelParamsInclude<TypeUtilGetRelationModel<Relation>>;
    with?: Record<string, unknown>;
  };

export type TypeUtilGetRelationType<Relation> = Relation extends { type?: infer TYPE } ? TYPE : undefined;
export type TypeUtilGetRelationModel<Relation> =
  Relation extends
  { model?: ((() => Constructable<infer MODEL extends BeanModelMeta>) | Constructable<infer MODEL extends BeanModelMeta>) }
    ? MODEL :
    Relation extends
    { model?: ((() => infer MODEL extends BeanModelMeta) | infer MODEL extends BeanModelMeta) }
      ? MODEL :
      Relation extends { model?: () => Constructable<infer MODEL extends BeanModelMeta> } ? MODEL :
      Relation extends { model?: () => infer MODEL extends BeanModelMeta } ? MODEL :
      Relation extends { model?: Constructable<infer MODEL extends BeanModelMeta> } ? MODEL :
      Relation extends { model?: infer MODEL extends BeanModelMeta } ? MODEL : undefined;

export type TypeUtilGetRelationModelOptions<Relation> = TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationEntity<Relation> = TypeUtilGetModelEntity<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationEntityMeta<Relation> = TypeUtilGetModelEntityMeta<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationOptions<Relation> = Relation extends { options?: infer OPTIONS extends {} } ? OPTIONS : undefined;
export type TypeUtilGetRelationOptionsAutoload<Relation> = Relation extends { options?: { autoload?: infer AUTOLOAD } } ? AUTOLOAD : undefined;
export type TypeUtilGetModelOptions<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model[TypeSymbolKeyModelOptions] : undefined;
export type TypeUtilGetModelEntity<Model extends BeanModelMeta | undefined> = Model extends BeanModelMeta ? Model[TypeSymbolKeyEntity] : undefined;
export type TypeUtilGetModelEntityMeta<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model[TypeSymbolKeyEntityMeta] : undefined;

export type TypeUtilGetRelationEntityByType<Relation, IncludeWrapper extends {} | undefined> =
  TypeUtilGetEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModel<Relation>,
    IncludeWrapper
  >;
export type TypeUtilGetEntityByType<TRecord, TYPE, TModel extends BeanModelMeta | undefined, IncludeWrapper extends {} | undefined> =
  TYPE extends 'hasMany' | 'belongsToMany' ? Array<TypeModelRelationResult<TRecord, TModel, IncludeWrapper>> : TypeModelRelationResult<TRecord, TModel, IncludeWrapper> | undefined;

export type TypeUtilGetParamsInlcude<TParams> = TParams extends { include?: infer INCLUDE extends {} } ? INCLUDE : undefined;
export type TypeUtilGetParamsWith<TParams> = TParams extends { with?: infer WITH extends {} } ? WITH : undefined;

export type TypeModelRelationResult<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation> =
  TRecord &
  (TModel extends BeanModelMeta ?
      (
        OmitNever<TypeModelRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
        OmitNever<TypeModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
      ) : {});

export type TypeModelRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined> = {
  [RelationName in (keyof TModelOptions['relations'])]:
  TInclude[RelationName] extends {} | boolean ?
    TypeModelRelationResultMergeIncludeWrapper<TModelOptions['relations'][RelationName], TInclude[RelationName]> :
    TypeModelRelationResultMergeAutoload<TModelOptions['relations'][RelationName]>;
};

export type TypeModelRelationResultMergeWith<TWith extends {} | undefined> =
  TWith extends {} ?
      { [RelationName in (keyof TWith)]: TypeModelRelationResultMergeWithRelation<TWith[RelationName]> }
    : {};

export type TypeModelRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilGetRelationEntityByType<Relation, undefined> : never;

export type TypeModelRelationResultMergeIncludeWrapper<Relation, IncludeWrapper> =
  IncludeWrapper extends false ? never :
  IncludeWrapper extends true ?
    TypeUtilGetRelationEntityByType<Relation, undefined> :
    IncludeWrapper extends {} ? TypeUtilGetRelationEntityByType<Relation, IncludeWrapper> : never;

export type TypeModelRelationResultMergeWithRelation<WithRelation> =
  WithRelation extends false ? never :
  WithRelation extends true ?
    never :
    WithRelation extends {} ? TypeUtilGetRelationEntityByType<WithRelation, TypeUtilGetRelationOptions<WithRelation>> : never;
