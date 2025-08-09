import type { OmitNever, TypeOmitStringUnion } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from '../model.ts';
import type { TypeModelColumnsStrict } from '../modelWhere.ts';
import type { IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity, TypeUtilEntityOmit, TypeUtilEntityPartial, TypeUtilEntitySelector, TypeUtilGetParamsColumns, TypeUtilPrepareColumns } from '../relations.ts';
import { extend } from '@cabloy/extend';

export type TypeDtoMutateType = 'create' | 'update' | 'mutate';

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
}

export type TypeDtoMutateResult<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  TOptionsRelation,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> =
TypeDtoMutateRelationResult<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>,
  TOptionsRelation,
  TMutateTypeTopLevel,
  TColumnsOmitDefault,
  TTopLevel
>;

export type TypeDtoMutateRelationResult<
  TRecord,
  TModel extends BeanModelMeta | undefined,
  TOptionsRelation,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> =
  TypeDtoMutateRelationResultEntity<TRecord, TypeUtilGetParamsColumns<TOptionsRelation>, TMutateTypeTopLevel, TColumnsOmitDefault, TTopLevel>
 &
  (TModel extends BeanModelMeta ?
      (
        OmitNever<TypeModelRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
        OmitNever<TypeModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
      ) : {});

type TypeDtoMutateRelationResultEntity<
  TRecord,
  Columns = undefined,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> = TypeDtoMutateRelationResultPatch<
  TypeDtoMutateRelationResultEntityInner<TRecord, Columns, TMutateTypeTopLevel, TColumnsOmitDefault, TTopLevel>,
  TMutateTypeTopLevel,
  TTopLevel
>;

type TypeDtoMutateRelationResultPatch<
  TRecordResult,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> = TTopLevel extends false ? TMutateTypeTopLevel extends 'update' | 'mutate' ?
  TypeUtilEntityPartial<TRecordResult, 'id' | 'deleted'> : TRecordResult : TRecordResult;

type TypeDtoMutateRelationResultEntityInner<
  TRecord,
  Columns = undefined,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> = Columns extends string | string[] ?
  TypeDtoMutateRelationResultEntityFromColumns<TRecord, Columns, TMutateTypeTopLevel, TTopLevel> :
  TypeDtoMutateRelationResultEntityFromColumnsOmitDefault<TRecord, TMutateTypeTopLevel, TColumnsOmitDefault>;

type TypeDtoMutateRelationResultEntityFromColumns<
  TRecord,
  Columns = undefined,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> = TypeUtilEntitySelector<
  TRecord,
  TypeUtilPrepareColumns<TypeDtoMutateRelationResultPrepareColumns<
    TypeUtilPrepareColumns<Columns>,
    TMutateTypeTopLevel,
    TTopLevel
  >>
>;

type TypeDtoMutateRelationResultEntityFromColumnsOmitDefault<
  TRecord,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
> = TypeUtilEntityOmit<
  TRecord,
  TypeUtilPrepareColumns<TypeDtoMutateRelationResultPrepareColumnsOmitDefault<
    TMutateTypeTopLevel,
    TColumnsOmitDefault
  >>
>;
type TypeDtoMutateRelationResultPrepareColumns<
  TColumns = undefined,
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TTopLevel extends boolean | undefined = undefined,
> = TTopLevel extends true ? TColumns :
TMutateTypeTopLevel extends 'create' ?
  TypeOmitStringUnion<TColumns, 'deleted' | 'id'> : (TColumns | 'deleted' | 'id')
;

type TypeDtoMutateRelationResultPrepareColumnsOmitDefault<
  TMutateTypeTopLevel extends TypeDtoMutateType | undefined = undefined,
  TColumnsOmitDefault extends string | string[] | undefined = undefined,
> = TColumnsOmitDefault extends string | string[] ?
  TColumnsOmitDefault :
  TMutateTypeTopLevel extends 'create' ?
      ['id', 'iid', 'deleted', 'createdAt', 'updatedAt'] :
      ['iid', 'createdAt', 'updatedAt'];

// TypeUtilPrepareColumns<TColumns extends string | string[] ? TColumns : TypeUtilGetParamsColumns<TOptionsRelation>>
// TypeUtilEntitySelector<TRecord
