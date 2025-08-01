import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from '../model.ts';
import type { TypeModelColumnsStrict } from '../modelWhere.ts';
import type { IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeModelRelationResult, TypeSymbolKeyEntity, TypeUtilEntitySelector } from '../relations.ts';

export type IDtoMutateParams<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
> = IBuildDtoMutateParams<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>
>;

export interface IBuildDtoMutateParams<
  TRecord,
  Model extends BeanModelMeta,
> extends
  IModelRelationIncludeWrapper<Model>,
  IBuildDtoMutateParamsBasic<TRecord> {}

export interface IBuildDtoMutateParamsBasic<
  TRecord,
> {
  columns?: TypeModelColumnsStrict<TRecord>;
  columnsOmit?: TypeModelColumnsStrict<TRecord>;
}

export type TypeDtoMutateResult<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  TOptionsRelation,
  ColumnsOmitDefault extends TypeModelColumnsStrict<TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity]> | undefined = undefined,
> =
TypeModelRelationResult<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>,
  TOptionsRelation,
>;

export type TypeModelRelationResult_DtoMutate<
  TRecord,
  TModel extends BeanModelMeta | undefined,
  TOptionsRelation,
  TColumns = undefined,
  TColumnsOmit = undefined,
  TColumnsOmitDefault = undefined,
> =
  TypeUtilEntitySelector<
    TRecord,
    TypeUtilPrepareColumns<TColumns extends string | string[] ? TColumns : TypeUtilGetParamsColumns<TOptionsRelation>>
  > &
  (TModel extends BeanModelMeta ?
      (
        OmitNever<TypeModelRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
        OmitNever<TypeModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
      ) : {});
