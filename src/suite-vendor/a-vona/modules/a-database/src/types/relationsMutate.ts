import type { OmitNever } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelRelationResultMergeInclude, TypeModelRelationResultMergeWith, TypeUtilGetModelOptions, TypeUtilGetParamsInlcude, TypeUtilGetParamsWith, TypeUtilGetRelationModel } from './relations.ts';
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

export type TypeModelMutationRelationData<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation> = 
TRecord &
(TModel extends BeanModelMeta ?
    (
       OmitNever<TypeModelRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>>
       
    ) : {});

// TRecord &
// (TModel extends BeanModelMeta ?
//     (
//       OmitNever<TypeModelRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
//       OmitNever<TypeModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
//     ) : {});
