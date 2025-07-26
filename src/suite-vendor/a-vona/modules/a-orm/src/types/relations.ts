import type { Constructable, OmitNever } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from './onion/model.ts';
import type { TypeModelAggrRelationResultAggrs, TypeUtilGetAggrsFromRelationAndIncludeWrapper } from './relationsAggr.ts';

export const SymbolKeyEntity = Symbol('$entity');
export const SymbolKeyEntityMeta = Symbol('$entityMeta');
export const SymbolKeyModelOptions = Symbol('$modelOptions');
export type TypeSymbolKeyEntity = typeof SymbolKeyEntity;
export type TypeSymbolKeyEntityMeta = typeof SymbolKeyEntityMeta;
export type TypeSymbolKeyModelOptions = typeof SymbolKeyModelOptions;

export type TypeModelOfModelLike<ModelLike extends BeanModelMeta | (keyof IModelClassRecord)> =
  ModelLike extends (keyof IModelClassRecord) ? IModelClassRecord[ModelLike] : ModelLike;

export type TypeModelClassLike<MODEL extends BeanModelMeta | (keyof IModelClassRecord)> =
  MODEL extends BeanModelMeta ? ((() => Constructable<MODEL>) | Constructable<MODEL>) : MODEL;

export type TypeModelClassLikeGeneral<MODEL extends BeanModelMeta = BeanModelMeta> =
  (() => Constructable<MODEL>) | Constructable<MODEL> | keyof IModelClassRecord;

export type TypeModelParamsInclude<MODEL extends BeanModelMeta | undefined> =
  TypeModelParamsIncludeByModelOptions<TypeUtilGetModelOptions<MODEL>>;

export type TypeModelParamsIncludeByModelOptions<ModelOptions extends IDecoratorModelOptions | undefined> =
  ModelOptions extends IDecoratorModelOptions ? {
    [relationName in keyof ModelOptions['relations'] ]?: TypeModelParamsRelationOptions<ModelOptions['relations'][relationName]>;
  } : never;

export type TypeModelParamsRelationOptions<Relation> =
  boolean
  | (Omit<TypeUtilGetRelationOptions<Relation>, 'autoload'>
    & {
      include?: TypeModelParamsInclude<TypeUtilGetRelationModel<Relation>>;
      with?: Record<string, unknown>;
    });

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
      Relation extends { model?: infer MODEL extends BeanModelMeta } ? MODEL :
      Relation extends { model?: infer MODELNAME extends keyof IModelClassRecord } ? IModelClassRecord[MODELNAME] : undefined;

export type TypeUtilGetRelationModelOptions<Relation> = TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationEntity<Relation> = TypeUtilGetModelEntity<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationEntityMeta<Relation> = TypeUtilGetModelEntityMeta<TypeUtilGetRelationModel<Relation>>;
export type TypeUtilGetRelationOptions<Relation> = Relation extends { options?: infer OPTIONS extends {} } ? OPTIONS : undefined;
export type TypeUtilGetRelationOptionsAutoload<Relation> = Relation extends { options?: { autoload?: infer AUTOLOAD } } ? AUTOLOAD : undefined;
export type TypeUtilGetRelationOptionsColumns<Relation> = Relation extends { options?: { columns?: infer COLUMNS } } ? COLUMNS : undefined;
export type TypeUtilGetRelationOptionsAggrs<Relation> = Relation extends { options?: { aggrs?: infer Aggrs } } ? Aggrs : undefined;
export type TypeUtilGetModelOptions<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model[TypeSymbolKeyModelOptions] : undefined;
export type TypeUtilGetModelEntity<Model extends BeanModelMeta | undefined> = Model extends BeanModelMeta ? Model[TypeSymbolKeyEntity] : undefined;
export type TypeUtilGetModelEntityMeta<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model[TypeSymbolKeyEntityMeta] : undefined;
export type TypeUtilGetModelOnionName<Model extends BeanModelMeta | undefined> =
  Model extends BeanModelMeta ? Model['$onionName'] : undefined;

export type TypeUtilGetRelationEntityByType<Relation, IncludeWrapper extends {} | undefined> =
  TypeUtilGetEntityByType<
    TypeUtilGetRelationEntity<Relation>,
    TypeUtilGetRelationType<Relation>,
    TypeUtilGetRelationModel<Relation>,
    IncludeWrapper,
    TypeUtilGetColumnsFromRelationAndIncludeWrapper<Relation, IncludeWrapper>,
    TypeUtilGetAggrsFromRelationAndIncludeWrapper<Relation, IncludeWrapper>
  >;
export type TypeUtilGetEntityByType<TRecord, TYPE, TModel extends BeanModelMeta | undefined, IncludeWrapper extends {} | undefined, Columns, Aggrs> =
  TYPE extends 'hasMany' | 'belongsToMany' ?
    Aggrs extends {} ?
      TypeModelRelationResult<TRecord, TModel, IncludeWrapper, Columns, Aggrs> :
      Array<TypeModelRelationResult<TRecord, TModel, IncludeWrapper, Columns>> :
    TypeModelRelationResult<TRecord, TModel, IncludeWrapper, Columns> | undefined;

export type TypeUtilGetParamsAggrs<TParams> = TParams extends { aggrs?: infer Aggrs extends {} } ? Aggrs : undefined;
export type TypeUtilGetParamsInlcude<TParams> = TParams extends { include?: infer INCLUDE extends {} } ? INCLUDE : undefined;
export type TypeUtilGetParamsWith<TParams> = TParams extends { with?: infer WITH extends {} } ? WITH : undefined;
export type TypeUtilGetParamsColumns<TParams> = TParams extends { columns?: infer COLUMNS } ? COLUMNS : undefined;
export type TypeUtilPrepareColumns<TColumns> = TColumns extends '*' | ['*'] ? undefined : TColumns extends string[] ? TColumns[number] : TColumns extends string ? TColumns : undefined;
export type TypeUtilEntitySelector<TRecord, TColumns> = [TColumns] extends [keyof TRecord] ? Pick<TRecord, TColumns> : TRecord;
export type TypeUtilGetColumnsFromRelationAndIncludeWrapper<Relation, IncludeWrapper extends {} | undefined> =
  TypeUtilGetParamsColumns<IncludeWrapper> extends string | string[] ?
    TypeUtilGetParamsColumns<IncludeWrapper> : TypeUtilGetRelationOptionsColumns<Relation>;

export type TypeModelRelationResult<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation, TColumns = undefined, Aggrs = undefined> =
  Aggrs extends {} ?
    TypeModelAggrRelationResultAggrs<Aggrs> :
    TypeModelRelationResult_Normal<TRecord, TModel, TOptionsRelation, TColumns>;

export type TypeModelRelationResult_Normal<TRecord, TModel extends BeanModelMeta | undefined, TOptionsRelation, TColumns = undefined> =
  TypeUtilEntitySelector<
    TRecord,
    TypeUtilPrepareColumns<TColumns extends string | string[] ? TColumns : TypeUtilGetParamsColumns<TOptionsRelation>>
  > &
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
