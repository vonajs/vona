import type { Constructable, OmitNever, TypeConfirmArray, TypeRecordValues } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from './onion/model.ts';

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

export type TypeEntityTableColumnNames<EntityMeta extends { $table: string } | undefined> = EntityMeta extends { $table: string } ? (keyof { [K in keyof EntityMeta as K extends '$table' ? never : K extends string ? `${EntityMeta['$table']}.${K}` : never ]: EntityMeta[K] }) : never;
export type TypeEntityTableColumnNamesShort<Entity> = keyof Entity;

export type TypeEntityTableColumnNamesOfModels<A extends BeanModelMeta[]> = TypeEntityTableColumnNames<A[number][TypeSymbolKeyEntityMeta]>;

// export type TypeEntityTableColumnNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeEntityTableColumnNames<TypeRecordValues<{
//   [RelationName in keyof TModelOptions['relations']]: TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>;
// }>>;
export type TypeEntityTableColumnNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeRecordValues<{
  [RelationName in keyof TModelOptions['relations']]: TypeEntityTableColumnNames<TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>>;
}>;

export type TypeEntityTableColumnNamesOfModelClass<TModel extends BeanModelMeta> =
  TypeEntityTableColumnNamesOfModelOptions<TypeUtilGetModelOptions<TModel>>;

export type TypeEntityTableColumnNamesOfModelJoins<TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[]> =
    TypeEntityTableColumnNames<IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntityMeta]>;

export type TypeEntityTableColumnNamesOfModelSelf<TModel extends BeanModelMeta> =
  TypeEntityTableColumnNames<TModel[TypeSymbolKeyEntityMeta]> | TypeEntityTableColumnNamesShort<TModel[TypeSymbolKeyEntity]>;

export type TypeEntityTableColumnNamesOfGeneral<
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  TModel extends BeanModelMeta,
> =
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] ?
      (TypeEntityTableColumnNamesOfModelJoins<TModelJoins> | TypeEntityTableColumnNamesOfModelSelf<TModel>) :
      (TypeEntityTableColumnNamesOfModelClass<TModel> | TypeEntityTableColumnNamesOfModelSelf<TModel>);

export type TypeEntityTableNames<EntityMeta extends { $table: string } | undefined> =
  EntityMeta extends { $table: infer TableName } ? TableName : never;

export type TypeEntityTableNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeRecordValues<{
  [RelationName in keyof TModelOptions['relations']]: TypeEntityTableNames<TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>>;
}>;

export type TypeEntityTableNamesOfModelJoins<TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[]> =
    TypeEntityTableNames<IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntityMeta]>;

export type TypeEntityTableNamesOfModelClass<TModel extends BeanModelMeta> =
  TypeEntityTableNamesOfModelOptions<TypeUtilGetModelOptions<TModel>>;

export type TypeEntityTableNamesOfGeneral<
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  TModel extends BeanModelMeta,
> =
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] ?
    TypeEntityTableNamesOfModelJoins<TModelJoins> :
    TypeEntityTableNamesOfModelClass<TModel>;

// const a: TypeMap<[ModelPost, ModelUser]> = '';
// const b: TypeEntityTableColumnNames<EntityPostMeta | EntityUserMeta> = '';
// const c: TypeEntityTableColumnNames<EntityPostMeta> | TypeEntityTableColumnNames<EntityUserMeta> = '';
// const d: TypeModelRelationModelsOfModelOptions<IModelOptionsPost>;

// type ttt =  { [key in keyof IModelOptionsPost as keyof IModelOptionsPost[key]]: IModelOptionsPost[key] };

// interface info { user: 'a' | 'b'; post: 'c' | 'd' }
// type keyinfo = info[keyof info];
//  const e: TypeEntityTableColumnNamesOfModelOptions<IModelOptionsPost> = '';

// const f: TypeEntityTableColumnNamesOfModelJoins<['test-vona:post', 'test-vona:user']> | TypeEntityTableColumnNamesOfModelSelf<ModelPost> = '';
//  const f2: TypeEntityTableColumnNamesOfModelSelf<ModelPost>='';

// const a: TypeModelRelationResultMergeWithRelation<{ type: 'belongsTo'; model: ModelPost; options: { include: { postContent: true } } }>;
// a?.user.
