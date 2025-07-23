import type { OmitNever } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelRelationResultMergeInclude, TypeModelRelationResultMergeWith, TypeUtilGetModelOptions, TypeUtilGetParamsInlcude, TypeUtilGetParamsWith, TypeUtilGetRelationEntity, TypeUtilGetRelationModel, TypeUtilGetRelationOptionsAutoload, TypeUtilGetRelationType } from './relations.ts';
import type { IDecoratorModelOptions } from './onion/model.ts';

export type TypeModelMutateParamsInclude<MODEL extends BeanModelMeta | undefined> =
  TypeModelMutateParamsIncludeByModelOptions<TypeUtilGetModelOptions<MODEL>>;

export type TypeModelMutateParamsIncludeByModelOptions<ModelOptions extends IDecoratorModelOptions | undefined> =
  ModelOptions extends IDecoratorModelOptions ? {
    [relationName in keyof ModelOptions['relations'] ]?: TypeModelMutateParamsRelationOptions<ModelOptions['relations'][relationName]>;
  } : never;

export type TypeModelMutateParamsRelationOptions<Relation> =
  boolean
  & {
    include?: TypeModelMutateParamsInclude<TypeUtilGetRelationModel<Relation>>;
    with?: Record<string, unknown>;
  };

export type TypeModelMutateRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined> = {
  [RelationName in (keyof TModelOptions['relations'])]?:
  TInclude[RelationName] extends {} | boolean ?
    TypeModelMutateRelationResultMergeIncludeWrapper<TModelOptions['relations'][RelationName], TInclude[RelationName]> :
    TypeModelMutateRelationResultMergeAutoload<TModelOptions['relations'][RelationName]>;
};  

export type TypeModelMutateRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilMutateGetRelationEntityByType<Relation, undefined> : never;

export type TypeModelMutateRelationResultMergeIncludeWrapper<Relation, IncludeWrapper> =
  IncludeWrapper extends false ? never :
  IncludeWrapper extends true ?
    TypeUtilMutateGetRelationEntityByType<Relation, undefined> :
    IncludeWrapper extends {} ? TypeUtilMutateGetRelationEntityByType<Relation, IncludeWrapper> : never;

export type TypeUtilMutateGetRelationEntityByType<Relation, IncludeWrapper extends {} | undefined> =
  TypeUtilMutateGetEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModel<Relation>,
    IncludeWrapper
  >;

  export type TypeUtilMutateGetEntityByType<TRecord, TYPE, TModel extends BeanModelMeta | undefined, IncludeWrapper extends {} | undefined> =
    TYPE extends 'hasMany' | 'belongsToMany' ? Array<TypeModelMutateRelationData<TRecord, TModel, IncludeWrapper>> | undefined : TypeModelMutateRelationData<TRecord, TModel, IncludeWrapper> | undefined;

export type TypeModelMutateRelationData<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation> = 
  Partial<TRecord> &
  (TModel extends BeanModelMeta ?
    (
      OmitNever<TypeModelMutateRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
      OmitNever<TypeModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
    ) : {});


  