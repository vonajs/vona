import type { TableIdentity } from 'table-identity';
import type { OmitNever } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions } from './onion/model.ts';
import type { TypeUtilGetModelOptions, TypeUtilGetParamsInlcude, TypeUtilGetParamsWith, TypeUtilGetRelationEntity, TypeUtilGetRelationModel, TypeUtilGetRelationOptions, TypeUtilGetRelationOptionsAutoload, TypeUtilGetRelationType } from './relations.ts';
import type { IModelRelationOptionsMetaWrapper } from './relationsDef.ts';

export type TypeModelMutateParamsInclude<MODEL extends BeanModelMeta | undefined> =
  TypeModelMutateParamsIncludeByModelOptions<TypeUtilGetModelOptions<MODEL>>;

export type TypeModelMutateParamsIncludeByModelOptions<ModelOptions extends IDecoratorModelOptions | undefined> =
  ModelOptions extends IDecoratorModelOptions ? {
    [relationName in keyof ModelOptions['relations'] ]?: TypeModelMutateParamsRelationOptions<ModelOptions['relations'][relationName]>;
  } : never;

export type TypeModelMutateParamsRelationOptions<Relation> =
  boolean
  | (IModelRelationOptionsMetaWrapper
    & {
      include?: TypeModelMutateParamsInclude<TypeUtilGetRelationModel<Relation>>;
      with?: Record<string, unknown>;
    });

export type TypeModelMutateRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined | unknown> = {
  [RelationName in (keyof TModelOptions['relations'])]: // not use ?: for OmitNever take effect
  TInclude extends {} ?
    TInclude[RelationName] extends {} | boolean ?
      TypeModelMutateRelationResultMergeIncludeWrapper<TModelOptions['relations'][RelationName], TInclude[RelationName]> :
      TypeModelMutateRelationResultMergeAutoload<TModelOptions['relations'][RelationName]> :
    TypeModelMutateRelationResultMergeAutoload<TModelOptions['relations'][RelationName]>;
};

export type TypeModelMutateRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilMutateGetRelationEntityByType<Relation, undefined> : never;

export type TypeModelMutateRelationResultMergeIncludeWrapper<Relation, IncludeWrapper> =
  IncludeWrapper extends false ? never :
  IncludeWrapper extends true ?
    TypeUtilMutateGetRelationEntityByType<Relation, undefined> :
    IncludeWrapper extends {} ? TypeUtilMutateGetRelationEntityByType<Relation, IncludeWrapper> : never;

export type TypeUtilMutateGetRelationEntityByType<Relation, IncludeWrapper extends {} | undefined | unknown> =
  TypeUtilMutateGetEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModel<Relation>,
    IncludeWrapper
  >;

export type TypeUtilMutateGetEntityByType<TRecord, TYPE, TModel extends BeanModelMeta | undefined, IncludeWrapper extends {} | undefined | unknown> =
    TYPE extends 'belongsTo' ? never :
    TYPE extends 'belongsToMany' ? Array<{ id: TableIdentity; deleted?: boolean }> :
    TYPE extends 'hasMany' ? Array<TypeModelMutateRelationData<TRecord, TModel, IncludeWrapper>> | undefined : TypeModelMutateRelationData<TRecord, TModel, IncludeWrapper> | undefined;

export type TypeModelMutateRelationResultMergeWith<TWith extends {} | undefined | unknown> =
  TWith extends {} ?
      { [RelationName in (keyof TWith)]: TypeModelMutateRelationResultMergeWithRelation<TWith[RelationName]> }
    : {};

export type TypeModelMutateRelationResultMergeWithRelation<WithRelation> =
  WithRelation extends false ? never :
  WithRelation extends true ?
    never :
    WithRelation extends {} ? TypeUtilMutateGetRelationEntityByType<WithRelation, TypeUtilGetRelationOptions<WithRelation>> : never;

export type TypeModelMutateRelationData<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation> =
  Partial<TRecord> &
  (TModel extends BeanModelMeta ?
      (
      Partial<OmitNever<TypeModelMutateRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>>> &
      Partial<OmitNever<TypeModelMutateRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>>
      ) : {});
