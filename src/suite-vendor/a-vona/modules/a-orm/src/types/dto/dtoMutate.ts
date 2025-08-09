import type { OmitNever, TypeOmitStringUnion } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from '../model.ts';
import type { TypeModelColumnsStrict } from '../modelWhere.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity, TypeUtilEntityOmit, TypeUtilEntityPartial, TypeUtilEntitySelector, TypeUtilGetColumnsFromRelationAndIncludeWrapper, TypeUtilGetModelOptions, TypeUtilGetParamsColumns, TypeUtilGetParamsInlcude, TypeUtilGetParamsWith, TypeUtilGetRelationEntity, TypeUtilGetRelationModel, TypeUtilGetRelationOptions, TypeUtilGetRelationType, TypeUtilPrepareColumns } from '../relations.ts';
import type { TypeUtilGetAggrsFromRelationAndIncludeWrapper } from '../relationsAggr.ts';
import type { TypeUtilGetGroupsFromRelationAndIncludeWrapper } from '../relationsGroup.ts';
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
  TColumns = undefined,
> =
  TypeDtoMutateRelationResultEntity<
    TRecord,
    TColumns extends string | string[] ? TColumns : TypeUtilGetParamsColumns<TOptionsRelation>,
    TMutateTypeTopLevel,
    TColumnsOmitDefault,
    TTopLevel
  >
 &
  (TModel extends BeanModelMeta ?
      (
        OmitNever<TypeDtoMutateRelationResultMergeInclude<TypeUtilGetModelOptions<TModel>, TypeUtilGetParamsInlcude<TOptionsRelation>>> &
        OmitNever<TypeDtoMutateModelRelationResultMergeWith<TypeUtilGetParamsWith<TOptionsRelation>>>
      ) : {});

type TypeDtoMutateRelationResultMergeInclude<TModelOptions extends IDecoratorModelOptions, TInclude extends {} | undefined> = {
  [RelationName in (keyof TModelOptions['relations'])]:
  TInclude[RelationName] extends {} | boolean ?
    TypeDtoMutateRelationResultMergeIncludeWrapper<TModelOptions['relations'][RelationName], TInclude[RelationName]> :
    TypeDtoMutateRelationResultMergeAutoload<TModelOptions['relations'][RelationName]>;
};

 type TypeDtoMutateModelRelationResultMergeWith<TWith extends {} | undefined> =
  TWith extends {} ?
      { [RelationName in (keyof TWith)]: TypeDtoMutateRelationResultMergeWithRelation<TWith[RelationName]> }
    : {};

 type TypeDtoMutateRelationResultMergeIncludeWrapper<Relation, IncludeWrapper> =
  IncludeWrapper extends false ? never :
  IncludeWrapper extends true ?
    TypeUtilGetRelationEntityByType<Relation, undefined> :
    IncludeWrapper extends {} ? TypeUtilGetRelationEntityByType<Relation, IncludeWrapper> : never;

export type TypeDtoMutateRelationResultMergeAutoload<Relation> =
  TypeUtilGetRelationOptionsAutoload<Relation> extends true ? TypeUtilGetRelationEntityByType<Relation, undefined> : never;

export type TypeDtoMutateRelationResultMergeWithRelation<WithRelation> =
  WithRelation extends false ? never :
  WithRelation extends true ?
    never :
    WithRelation extends {} ? TypeUtilGetDtoMutateRelationEntityByType<WithRelation, TypeUtilGetRelationOptions<WithRelation>> : never;

export type TypeUtilGetDtoMutateRelationEntityByType<Relation, IncludeWrapper extends {} | undefined> =
  TypeUtilGetDtoMutateEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModel<Relation>,
    IncludeWrapper,
    TypeUtilGetColumnsFromRelationAndIncludeWrapper<Relation, IncludeWrapper>,
  >;
export type TypeUtilGetDtoMutateEntityByType<
  TRecord,
  TYPE,
  TModel extends BeanModelMeta | undefined,
  IncludeWrapper extends {} | undefined,
  Columns,

> =
  TYPE extends 'hasMany' | 'belongsToMany' ?
    Array<TypeDtoMutateRelationResult<TRecord, TModel, IncludeWrapper, Columns>> | undefined :
    TypeDtoMutateRelationResult<TRecord, TModel, IncludeWrapper, Columns> | undefined;

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
